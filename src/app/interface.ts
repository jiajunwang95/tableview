 
export interface RAWDATA {
    data : []; //Store the rawdata inside...
    pass : number;
    fail : number;
    status : String[];
}

export interface TreeNodeInterface {
    key : string; //APPID + COUNTRY? + STATUS?
    APPID : string;
    COUNTRY : string[];
    TOTAL : number;
    children? : TreeNodeInterface[];
    data? : {
        [key : string] : RAWDATA};
    parent?: TreeNodeInterface;
    level? : number;
    expand? :boolean;
    
}