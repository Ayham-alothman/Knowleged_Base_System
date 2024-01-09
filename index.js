
let DivTerms=(str)=>{
  if(str.length>1&&str[0]!='-'){str=`+${str}`}
  let arr=[];
   let S='';
for(let i=0;i<str.length;i++){
if(str[i]=='+'||str[i]=='-'&&str[i-1]!='^'){
  if(i==0){S=S.concat(str[i])}
  else{  arr.push(S); S=str[i];  }
}
else{
  if(i==str.length-1){S=S.concat(str[i]);arr.push(S)}
  else{S=S.concat(str[i]);}


}

}
return arr;

}//end fun



let Indexof=(str,letter)=>{
  for(let i=0;i<str.length;i++){
      if(str[i]===letter){return Number(i)}
  }//end for
   }//end fun Index

   /////////////////

  let DeleteCharsOfString=(str,chr,all=0)=>{
    let NewStr='';
     if(chr.length>1){
      let j;
       for(let i=0;i<str.length;i++){
        let Try=str,j=0; 
        while(Try[i]==chr[j]){
          Try=String(Try)
          Try= Try.split('');
          Try.splice(i,1);
          Try=Try.join('')
          
          
          if(j==chr.length-1){return Try}
          j++;  
          
        }//end while    
   
       }//end for
        return str;

     }//end if chr>1
     /////////
     else if(chr.length==1){
      if(all==1){
      
        for(let i=0;i<str.length;i++){
          if(str[i]!=chr){  NewStr=NewStr.concat(str[i])  }//end if
        
         }//end for
         }
    
         else if(all==0){ 
          let Repeat=0;
          for(let i=0;i<str.length;i++){
            if(str[i]!=chr){  NewStr=NewStr.concat(str[i])  }//end if
            else if(str[i]==chr&&Repeat==0){Repeat=1 }
            else if(str[i]==chr&&Repeat==1){ NewStr=NewStr.concat(str[i]) }
           }//end for
        
         }
     }//end if chr=1
     return NewStr;

  }//end fun DeleString


   


const DiffreationPonomial=(str,point)=>{

    let TermsOpreations=DivTerms(str)
    console.log(TermsOpreations)
      for(let i=0;i<TermsOpreations.length;i++){ 
        if(TermsOpreations[i].includes('^','x')){
          let A=Indexof(TermsOpreations[i],'^');
          if(A==2&&!Number(TermsOpreations[i][1])){
            let PreNumber=`${TermsOpreations[i][0]}1`
            let PostNumber=TermsOpreations[i].slice(A+1,TermsOpreations[i].length);
            TermsOpreations[i]=`${Number(PreNumber)*Number(PostNumber)}x^${Number(PostNumber)-1}`;
              if(Number(PostNumber)-1==1){TermsOpreations[i]=`${Number(PreNumber)*Number(PostNumber)}x`;}
          }
             
            else if(Number(TermsOpreations[i][1])){
              let PreNumber=TermsOpreations[i].slice(0,A-1);
              let PostNumber=TermsOpreations[i].slice(A+1,TermsOpreations[i].length);
              TermsOpreations[i]=`${Number(PreNumber)*Number(PostNumber)}x^${Number(PostNumber)-1}`;
              if(Number(PostNumber)-1==1){TermsOpreations[i]=`${Number(PreNumber)*Number(PostNumber)}x`;}
            }
            
        }//end first if
        else if(TermsOpreations[i].includes('x')&&!TermsOpreations[i].includes('^')){
          if(TermsOpreations[i]==='+x'){TermsOpreations[i]='1'}
          else if(TermsOpreations[i]==='-x'){TermsOpreations[i]='-1'}
          else { TermsOpreations[i]=DeleteCharsOfString(TermsOpreations[i],'x',0);  }
          
    
        }
        else if(Number(TermsOpreations[i])){TermsOpreations[i]='0'  }
           

       

      }//end for
         
         if(Number(TermsOpreations[0][0])){TermsOpreations[0]=`+${TermsOpreations[0]}`;}
         console.log(TermsOpreations);//########
         let Diff= Clear(TermsOpreations)
         let Summution=0
         for(let i=0;i<TermsOpreations.length;i++){
          if(TermsOpreations[i].includes('x')&&TermsOpreations[i].includes('^')){
            let Ind=Indexof(TermsOpreations[i],'^'); 
              let PreNumber=TermsOpreations[i].slice(0,Ind-1);
              let PostNumber=TermsOpreations[i].slice(Ind+1,TermsOpreations[i].length);
               TermsOpreations[i]=Number(PreNumber)*Math.pow(point,PostNumber);
               Summution=Summution+TermsOpreations[i];
            


          }//end if

          else if(TermsOpreations[i].includes('x')&&!TermsOpreations[i].includes('^')){
               if(TermsOpreations[i]=='+x'||TermsOpreations[i]=='-x'){TermsOpreations[i][Indexof(TermsOpreations[i],'x')]=`${point}`;
                  Summution=Summution+Number(TermsOpreations[i])  }
               else{
                let N=TermsOpreations[i].slice(0,Indexof(TermsOpreations[i],'x'));
                TermsOpreations[i]=Number(N)*Number(point);
                Summution=Summution+TermsOpreations[i];
               }
          }//end elseif
          
          else{Summution=Summution+Number(TermsOpreations[i])}
          
          

         }
         console.log(TermsOpreations)
        return {Summution,Diff};

}//end fun


   //console.log( DiffreationPonomial('x-66',3))
   
const Result=()=>{
let Equation=document.getElementById('inputeqution').value;
let Point=document.getElementById('inputpoint').value;
if(Equation==''||Point==''){alert('Equation or point is empty')}
else{
  let val=DiffreationPonomial(Equation,Point);
  console.log(val.Diff)
   document.getElementById('resultDiff').innerHTML=val.Diff;
   document.getElementById('resultVal').innerHTML=val.Summution;
}

}//end fun

const Clear=(arr)=>{
  let NewArr=[]
  for(let i=0;i<arr.length;i++){
   if(arr[i]!=0){NewArr.push(arr[i])}
  }//end for
if(NewArr[0][0]=='+'){NewArr[0]=NewArr[0].slice(1,NewArr[0].length)}
return NewArr.join('')
}