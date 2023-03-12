package br.senai.sc.dtos.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TransactionType {

    DEBIT("Débito"),
    CREDIT("Crédito");

    private final String description;

}
