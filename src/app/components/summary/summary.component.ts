import { Component, OnInit } from '@angular/core';
import {RAWDATA, TreeNodeInterface} from '../../interface';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  constructor(){}
  /*Declaring variables...
  
  */
 mapOfExpanededData : { [key : string] : TreeNodeInterface[]} = {};
 status_array = ['pass','fail'];
 total_header = 4;
 div_expand_obj : any = {};
 table_data : any[] = [
  {key : 'PUPPET',
  APPID : 'PUPPET',
  COUNTRY : ['SG','MY','SW'],
  TOTAL : 25,
  data : {SDC : {
    data : [],
    pass : 2,
    fail : 5,
    status : [{status :'pass', expand : false},{status :'fail', expand : false}]
  }},
  children : [
    {key : 'PUPPET-SG',
    APPID : 'PUPPET v2',
    COUNTRY : 'SG',
    TOTAL : 1,
    data : {SDC : {
      data : [],
      pass : 2,
      fail : 1,
      status : [{status :'pass', expand : false}]
    }},
  }
  ]
},
{key : 'VISION',
APPID : 'VISION',
COUNTRY : ['MY'],
TOTAL : 25,
data : {SDC : {
  data : [],
  pass : 1,
  fail : 0,
  status : [{status :'pass', expand : false}]
}},
children : [
  {key : 'VISION-MY',
  APPID : 'VISION v2',
  COUNTRY : 'MY',
  TOTAL : 1,
  expand : false,
  data : {SDC : {
    data : [{hostname : "5"},{hostname : "6"},{hostname : "4"}],
    pass : 3,
    fail : 5,
    status : [{status :'pass', expand : false},{status :'fail', expand : false}]
  }},
},
{key : 'VISION-CN',
APPID : 'VISION v2',
COUNTRY : 'CN',
TOTAL : 1,
expand : false,
data : {SDC : {
  data : [{hostname : "1"},{hostname : "2"},{hostname : "3"}],
  pass : 3,
  fail : 5,
  status : [{status :'pass', expand : false},{status :'fail', expand : false}]
}},
}
]
}
 ]

 envSchema = [
  {head : 'SDC',shape : '', bodyKey : 'SDC'},
  {head : 'PDC',shape : '', bodyKey : 'PDC'},
  {head : 'DDC',shape : '', bodyKey : 'DDC'}
 ]
  ngOnInit(): void {
      for(let item of this.table_data){
        this.mapOfExpanededData[item.key] = this.convertTreeToList(item);
      }
  }

  /* Retrieve from https://ng.ant.design/components/table/en
    1. convertTreeToList
    2. visitNode
    3. collapse
  */
  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }
    console.log("GGive me array",array)
    return array;
  }
  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }
  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }
  //End of Retrieve from https://ng.ant.design/components/table/en
  /** 
  @param count : number
  @param status : string
  @returns divclass : string
  */
  giveNumberColor(count : number,status : string){
    // console.log("What is count",count,"status",status);
    if(status.includes('pass')){
      if(count > 0) return 'divgreen';
    }else{
      if(count > 0) return 'divred';
    }
    return 'divgrey';
  }
  /**
   * Consolidate the "data" key (Array) and return as array.
   * @param data : Object {SDC : {}, DDC :{}...}
   */
  GroupAll(data : any){
    const return_array = [];
    for(const KEY of Object.keys(data)){
      const RAWDATA = data[KEY]['data'];
      for(const ROW of RAWDATA){
        return_array.push(ROW)
      }
    }
    return return_array;
  }
  /**
   * This is to create the DIV object for expansion....
   * @param row - For Icon...
   * @param array_of_status - For Icon...
   * @param APPID - For data
   * @param COUNTRY  - For data
   * @param ENV  - For data
   * @param STATUS  - For data
   */
  updateDivExpand(row : any, array_of_status : any[],APPID :string,COUNTRY : any,ENV : string,STATUS :string){
    let country_tag = COUNTRY;
    if(typeof COUNTRY !== 'string'){ country_tag = ''}; //If this is for ALL....
    console.log("Give me row",row,"give me array",array_of_status,"country",COUNTRY);
    //1st.... for the pass/fail array set the expand status
    for(let each_row of array_of_status){
      if(each_row !== row){
        each_row['expand'] = false;
      }
    }
    if(row['expand']){
      row['expand'] = false;
    }else{
      row['expand'] = true;
    }
    //By checking that the status expand is indeed minimize then i will set it to false...
    if(this.div_expand_obj[APPID+country_tag]){
      if(this.div_expand_obj[APPID+country_tag]['expand'] && !row['expand']){
        this.div_expand_obj[APPID+country_tag]['expand'] = false;
      }else{
        this.div_expand_obj[APPID+country_tag]['expand'] = true;
      }
      this.div_expand_obj[APPID+country_tag]['selected_status'] = STATUS
      this.div_expand_obj[APPID+country_tag]['selected_env'] = ENV
    }else{
      this.div_expand_obj[APPID+country_tag] = {expand : true, selected_status : STATUS, selected_env : ENV}
      //Populate the data...
    }
  }
  /**
   * 
   * @param APPID 
   * @param COUNTRY 
   */
  IfDivIsExpanded(APPID :string,COUNTRY : any){
    let country_tag = COUNTRY;
    if(typeof COUNTRY !== 'string'){ country_tag = ''}; //If this is for ALL....
    if(this.div_expand_obj[APPID+country_tag]){
      return this.div_expand_obj[APPID+country_tag]['expand'];
    }else{
      return false;
    }
  }
}
