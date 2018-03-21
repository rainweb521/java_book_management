/*----------------------------------------*\ 
     * 使用 js 标记高亮关键词 by markcxz(markcxz@aol.com)
     * 参数说明: 
     * obj: 对象, 要进行高亮显示的html标签节点. 
     * hlWords: 字符串, 要进行高亮的关键词词, 使用 竖杠(|)或空格 分隔多个词 . 
     * cssClass: 字符串, 定义关键词突出显示风格的css伪类. 
     * 参考资料: javascript HTML DOM 高亮显示页面特定字词 By shawl.qiu
    \*----------------------------------------*/ 
    function MarkHighLight(obj,hlWords,cssClass){
    
        hlWords=AnalyzeHighLightWords(hlWords);
        
        if(obj==null || hlWords.length==0)
            return;
        if(cssClass==null)
            cssClass="highlight";
            
        MarkHighLightCore(obj,hlWords);
        
        //------------执行高亮标记的核心方法----------------------------

        function MarkHighLightCore(obj,keyWords){
        	
            var re=new RegExp(keyWords, "i"); 
            for(var i=0; i<obj.childNodes.length; i++){
                var childObj=obj.childNodes[i];
                if(childObj.nodeType==3){
                    if(childObj.data.search(re)==-1) continue; 
                    var reResult = new RegExp("("+keyWords+")", "gi"); 
                    var objResult = document.createElement("b");
                    objResult.innerHTML = childObj.data.replace(reResult,"<em style='color:#F00;'>$1</em>");                     
                    if(childObj.data == objResult.childNodes[0].innerHTML) continue; 
                    obj.replaceChild(objResult,childObj);                                      
                }else if(childObj.nodeType==1){
                    MarkHighLightCore(childObj,keyWords);
                }
            }
        }        

        //----------分析关键词----------------------

        function AnalyzeHighLightWords(hlWords)
        {
            if(hlWords==null) return "";
            hlWords=hlWords.replace(/\s+/g,"|").replace(/\|+/g,"|");            
            hlWords=hlWords.replace(/(^\|*)|(\|*$)/g, "");
            
            if(hlWords.length==0) return "";
            var wordsArr=hlWords.split("|"); 
            
            if(wordsArr.length>1){
                var resultArr=BubbleSort(wordsArr);
                var result="";
                for(var i=0;i<resultArr.length;i++){
                    result=result+"|"+resultArr[i];
                }                
                return result.replace(/(^\|*)|(\|*$)/g, "");

            }else{
                return hlWords;
            } 
        }    
        
        //-----利用冒泡排序法把长的关键词放前面-----    

        function BubbleSort(arr){        
            var temp, exchange;    
            for(var i=0;i<arr.length;i++){            
                exchange=false;                
                for(var j=arr.length-2;j>=i;j--){                
                    if((arr[j+1].length)>(arr[j]).length){                    
                        temp=arr[j+1]; arr[j+1]=arr[j]; arr[j]=temp;
                        exchange=true;
                    }
                }                
                if(!exchange)break;
            }
            return arr;            
        }
    
    }
    //----------------end------------------------