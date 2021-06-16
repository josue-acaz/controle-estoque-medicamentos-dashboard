enum EnumAppColors {
    PRIMARY = "#324f80",
    ERROR = "#f74d4d",
    SUCCESS = "#4CAF50",
    SECONDARY = "#CCCCCC",
};

enum EnumActions {
    LIST = "list",
    ADD = "add",
    UPDATE = "update",
    EXCLUDE = "exclude",
};

enum EnumDateFormatTypes {
    SQL = "yyyy'-'MM'-'dd", // 2021-08-14
    READABLE_V1 = "dd 'de' MMMM 'de' yyyy", // 14 de Agosto de 2021
    READABLE_v2 = 'LLL dd', // Set 24
    READABLE_v3 = "EEEE',' dd 'de' MMMM", // Quinta-Feira, 14 de Agosto às 22:45
    READABLE_v4 = 'dd LLL', // Set 24
    READABLE_V5 = "dd'/'MM'/'yyyy", // 14/08/2021
};

enum EnumDatetimeFormatTypes {
    SQL = "yyyy'-'MM'-'dd'T'HH':'mm':'ss", // 2021-08-12 22:45:30
    SQL_V2 = "yyyy'-'MM'-'dd HH':'mm'",
    READABLE_V1 = "dd 'de' MMMM', às ' HH:mm", // 14 de Agosto, às 22:45h
    READABLE_v2 = "EEEE',' dd 'de' MMMM' às ' HH:mm", // Quinta-Feira, 14 de Agosto às 22:45
    READABLE_v3 = "dd LLL ', às' HH:mm"
};

export {
    EnumAppColors, 
    EnumActions, 
    EnumDateFormatTypes,
    EnumDatetimeFormatTypes,
};