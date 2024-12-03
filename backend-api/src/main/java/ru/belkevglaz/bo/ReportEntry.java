package ru.belkevglaz.bo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReportEntry {

	int id;

	String name;

	String value;

}
