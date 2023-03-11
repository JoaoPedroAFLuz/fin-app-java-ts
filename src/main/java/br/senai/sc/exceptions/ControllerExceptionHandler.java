package br.senai.sc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ErrorResponseDTO UserNotFound(EntityNotFoundException e, HttpServletRequest request) {
        return ErrorResponseDTO.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .error("Usuário não encontrado")
                .message(e.getMessage())
                .path(request.getRequestURI())
                .build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorResponseDTO handleMethodArgumentoNotValid(MethodArgumentNotValidException e, HttpServletRequest request) {
        return handleBindingResult(e.getBindingResult(), request);
    }

    private ErrorResponseDTO handleBindingResult(BindingResult bindingResult, HttpServletRequest request) {
        final List<FieldMessage> errors = bindingResult.getFieldErrors()
                .stream()
                .map(fieldError -> new FieldMessage(fieldError.getField(), fieldError.getDefaultMessage()))
                .distinct()
                .collect(Collectors.toList());

        return ErrorResponseDTO.builder()
                .status(HttpStatus.UNPROCESSABLE_ENTITY.value())
                .error("Requisição inválida")
                .message("Preenchimento de campos de forma incorreta")
                .path(request.getRequestURI())
                .errors(errors)
                .build();
    }
}