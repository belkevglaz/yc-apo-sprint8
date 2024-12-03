package ru.belkevglaz.bo;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReportEntryList {

	public static ReportEntryList defaults() {

		return ReportEntryList.builder()
				.entries(List.of(
						ReportEntry.builder().id(1).name("First").value("First entry value").build(),
						ReportEntry.builder().id(1).name("Second").value("Second entry value").build(),
						ReportEntry.builder().id(1).name("Third").value("Third entry value").build()
				))
				.build();
	}

	private List<ReportEntry> entries;

}