import { array_of_array_to_array_of_obj } from "../DataFormatConverter";

export const GenerateCSV = (tableColumns, tableRows, title = "Table") => {
  let csvData = [];
  if (
    tableColumns &&
    tableColumns.length > 0 &&
    (typeof tableColumns[0] === "string" || tableColumns[0] instanceof String)
  ) {
    csvData = [[...tableColumns]];
  } else {
    csvData = [[...tableColumns.map((column) => column.title)]];
  }
  if (tableRows && tableRows.length > 0 && Array.isArray(tableRows[0])) {
    csvData = [...csvData, ...tableRows];
  } else {
    csvData = [
      ...csvData,
      ...tableRows.map((row) => [...Object.keys(row).map((key) => row[key])]),
    ];
  }
  // array to csv
  csvData = csvData
    .map((row) =>
      row
        .map(String) // convert every value to string
        .map((v) => v.replaceAll('"', '""')) //escape double colons
        .map((v) => `"${v}"`) //quote it
        .join(",")
    )
    .join("\r\n");

  var blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  var url = URL.createObjectURL(blob);

  var pom = document.createElement("a");
  pom.href = url;
  pom.setAttribute("download", title + ".csv");
  pom.click();
};

export const extract_table_columns_from_table_row = (tableRows) => {
  let tableRow = [];
  if (tableRows.length > 0) {
    tableRow = tableRows[0];
  }
  if (Array.isArray(tableRow) && tableRow.length > 0) {
    return tableRow.map((key, index) => {
      return {
        title: index.toString(),
        field: index.toString(),
      };
    });
  } else {
    return Object.keys(tableRow).map((key) => {
      return {
        title: key,
        field: key,
      };
    });
  }
};

const getTypeOfVariable = (x)=>{
  if (Array.isArray(x)){
    if(x.length > 0){
      if( Array.isArray(x[0]) ){
        return 'array_of_array'
      }
      else if(typeof x[0] === "string" || x[0] instanceof String ){
        return 'array_of_strings'
      }
      else if(Object.keys(x[0]).length > 0){
        return 'array_of_objects'
      }
      else if(x[0] instanceof Number){
        return 'array_of_int'
      }
    }
    return 'array'
  }
  else if( Object.keys(x).length > 0 ){
    return 'object'
  }
  return 'unknown'
}

export const DFC_convert_table_row_and_columns_to_standard_format = (propsTableColumns, propsTableRows) => {
  let tableColumns = []
  let tableRows = []
  let areColumnsDefined = Boolean(propsTableColumns) && Array.isArray(propsTableColumns) && propsTableColumns.length > 0
  let areRowsDefined = Boolean(propsTableRows) && Array.isArray(propsTableRows) && propsTableRows.length > 0
  let columnsType = 'unknown'
  let rowsType = 'unknown'
  if(areColumnsDefined){
    columnsType = getTypeOfVariable(propsTableColumns)
  }
  if(areRowsDefined){
    rowsType = getTypeOfVariable(propsTableRows)
  }

  if(areColumnsDefined){
    tableColumns = convert_columns_string_array_to_proper_format(propsTableColumns, columnsType)
    if(areRowsDefined){
      tableRows = convert_rows_to_proper_format_using_columns(propsTableRows, rowsType, tableColumns)
    }
    else{
      tableRows = []
    }
  }
  else{
    if(areRowsDefined){
      // Calculate columns from rows
      tableRows = propsTableRows
      tableColumns = extract_table_columns_from_table_row(tableRows);
    }
    else{
      tableColumns = []
      tableRows = []
    }
  }
  return { tableColumns: [...tableColumns], tableRows: [...tableRows] } 
}

const convert_columns_string_array_to_proper_format = (columns, columnsType) =>{
  if(columnsType === 'array_of_strings'){
    return columns.map((column_name) => ({
      title: column_name,
      field: column_name,
    }));
  }
  return columns
}

const convert_rows_to_proper_format_using_columns = (rows, rowsType, columns) =>{
  if(rowsType=== 'array_of_array'){
    return array_of_array_to_array_of_obj(
      rows,
      columns,
      "simple_array"
    );
  }
  return rows
}


export const filterTableData = (filter, tableRows) => {
  if (filter !== "") {
    let lowerCaseFilter = filter.toLowerCase();
    tableRows = tableRows.filter((row_obj, index) => {
      for (let key in row_obj) {
        if (
          row_obj[key] &&
          row_obj[key].toString().toLowerCase().includes(lowerCaseFilter)
        ) {
          return true;
        }
      }
      return false;
    });
  }
  return tableRows;
};

export const sortTableData = (sortConfig, tableRows) => {
  if (sortConfig.columnName != "") {
    if (sortConfig.order === "asc") {
      tableRows = tableRows.sort(
        (a, b) => a[sortConfig.columnName] > b[sortConfig.columnName]
      );
    } else if (sortConfig.order === "desc") {
      tableRows = tableRows.sort(
        (a, b) => a[sortConfig.columnName] < b[sortConfig.columnName]
      );
    }
  }
  return tableRows;
};
