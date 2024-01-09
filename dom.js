
class Node{
  constructor(val){
      this.val=val;
      this.NArow=0;
  }   
AddArow=(val)=>{
  this.NArow++;
  let NumberArows=this.NArow;
  this[`A${NumberArows}`]=new Node(val);
  
}
AddArowP=(val)=>{
  this.NArow++;
  let NumberArows=this.NArow;
  this[`A${NumberArows}`]=val;
  
}

}//end class node


class Tree{
constructor(){
    this.Root=new Node('root');
}

SearchNode=(val)=>{
    let StartNode=this.Root;
    if(val=='root'){ return{res:true,val:StartNode} }
    else if(Object.keys(StartNode).length>4){
      let Goal;
      let Queue=[];
      let Vistets=[];
      let LStart=Object.keys(StartNode).length-4;
     
      for(let i=1;i<=LStart;i++){
        if(StartNode[`A${i}`].val==val){return{res:true,val:StartNode[`A${i}`]}}
        Queue.push(StartNode[`A${i}`]);
        Vistets.push(StartNode[`A${i}`]);
        
      }
      
      while(Queue.length!=0){
        let CurentNode=Queue[0];
          for(let i=1;i<=Object.keys(CurentNode).length-4;i++){
            if(CurentNode[`A${i}`].val==val){return{res:true,val:CurentNode[`A${i}`]}}
              
            if(!Vistets.includes(CurentNode[`A${i}`])){
                Queue.push(CurentNode[`A${i}`]);
                Vistets.push(CurentNode[`A${i}`])
            } 
        

          }//end for
          Queue.shift();
      }//end while

        
    }//end if
  return false  
}

AddNode=(PreviousNode,NewNode)=>{
    if(PreviousNode=='root'){
      let Result= this.SearchNode(PreviousNode);
      if(Result.res){Result.val.AddArow(NewNode);}
       

    }

  else if(PreviousNode.length==1){
   let Result= this.SearchNode(PreviousNode);
   let New=this.SearchNode(NewNode);
   if(Result.res){ 
    if(New.res){Result.val.AddArowP(New.val)}
    else{Result.val.AddArow(NewNode)}  
      }

   else if(!Result.res){console.log(Error(`do't found previous node`))}
}
  else if(PreviousNode.length>1){
  let Result;
    for(let i=0;i<PreviousNode.length;i++){
       Result=this.SearchNode(PreviousNode[i]);
       if(!Result.res){return false}
    }//end for
    
    for(let i=0;i<PreviousNode.length;i++){
      Result=this.SearchNode(PreviousNode[i]);
      let New=this.SearchNode(NewNode);
      if(Result.res){
        if(New.res){Result.val.AddArowP(New.val)}
        else{Result.val.AddArow(NewNode)}  
      
      }
   }//end for
}

}

                 
}//end class Tree






class KnowlgedBase{

  constructor(a){
      //this.TreeLocal=new Tree();
      
      if(a.length==0){console.log(new Error('init fact no thing'))}
      else if(a.length!=0){
        this.Fact=a;
        this.TreeLocal=new Tree();
        for(let i=0;i<a.length;i++){
         this.TreeLocal.AddNode('root',a[i])
        }
      }
  }//end Constructor
    
  ReSet=()=>{   
    let Switch=1;
    let arr;
    let Vis=[]
  while(Switch){
    arr=[];
    if(this.Fact.includes('a')&&!Vis.includes('a')){Vis.push('a');arr.push({Pre:'a',New:'e'});this.TreeLocal.AddNode('a','e');}//1 Rule
    if(this.Fact.includes('b')&&this.Fact.includes('c')&&this.Fact.includes('d')&&!Vis.includes('bcd')){
      Vis.push('bcd');arr.push( {Pre:['b','c','d'],New:'f'} );this.TreeLocal.AddNode(['b','c','d'],'f');
    }//2 Rule
    if(this.Fact.includes('f')&&!Vis.includes('f')){Vis.push('f'); arr.push({Pre:'f',New:'h'});this.TreeLocal.AddNode('f','h');}//3 Rule
    if(this.Fact.includes('e')&&this.Fact.includes('f')&&!Vis.includes('ef')){
      Vis.push('ef');arr.push({Pre:['e','f'],New:'g'});this.TreeLocal.AddNode(['e','f'],'g');
    }//4 Rule
    if(this.Fact.includes('g')&&!Vis.includes('g')){Vis.push('g');arr.push({Pre:'g',New:'x'}) ;this.TreeLocal.AddNode('g','x'); }//5 Rule
    if(this.Fact.includes('h')&&!Vis.includes('h')){Vis.push('h');arr.push({Pre:'h',New:'y'});this.TreeLocal.AddNode('h','y');}//6 Rule
    
    // now prosess conditions
       if(arr.length==0){Switch=0}
       else if(arr.length!=0){
        for(let i=0;i<arr.length;i++){
          // add to tree
          this.Fact.push(arr[i].New);
        }//end for

       }   

    }//end while
  }//end fun reset
   



  SetToMemory=()=>{
   
   let M=[]
   let Q=[];
   let V=[];
   let Cur;
   Q.push(this.TreeLocal.Root)
    while(Q.length!=0){
      Cur=Q[0];
      if(Object.keys(Cur).length>3&&!V.includes(Cur.val)){
        V.push(Cur.val);
        for(let i=1;i<=Object.keys(Cur).length-4;i++){
          if(!V.includes(Cur[`A${i}`].val)&&!Q.includes(Cur[`A${i}`]) ){
           
            Q.push(Cur[`A${i}`])}
        }//end for
      }//end if
       M.push(Cur.val);
       Q.shift();
    }//end while
      M.shift();
     console.log(M)
  }
}//end class





//let K=new KnowlgedBase(['a','b','c','d']);
//K.ReSet();
//K.SetToMemory();
 
// in this inner code be search algorithm breadth in methid SetToMemory 