package br.senai.sc.exceptions;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponseDTO {

    private Integer status;
    private String error;
    private String message;
    private String path;
    @Singular
    private List<FieldMessage> errors;

}
