$(function(){
    BindCity(1,0);

    $("#lettercity dt").click(function()
    {
        //$("#lettercity dl").remove();
        $(this).after(BindCity(2,$(this).data("id")));
    });
});


function SelectedCity(obj)
{
    if(getUrlParam("type")==1)
    {
       localStorage.tripCity = $(obj).data("city"); 
    }

    if(getUrlParam("type")==2)
    {
       localStorage.backCity = $(obj).data("city"); 
    }
}

function BindCity(type,index)
{
    var citylist=localStorage.citylist;
    if(citylist=="" || citylist==undefined)
    {
        $.getJSON("json/citylist.json",function(data){
            localStorage.citylist=JSON.stringify(data); citylist=data;
        });
    } 

    var html="";
    citylist=JSON.parse(localStorage.citylist);
    if(type==1)
    {
        var hotArray=citylist[0].n;
        var resultHtml="<dt>热门城市</dt>";
        var sign=2;
        for (var i = 0; i <hotArray.length; i++)
        {
            var cityCode=hotArray[i].c;
            var city=hotArray[i].n;
            var country=hotArray[i].y;
            html+="<span data-cityCode='"+cityCode+"' data-country='"+country+"'>"+city+"</span>";
            if(i==sign)
            {
                resultHtml+="<dl>"+html+"</dl>";
                html="";
                sign=sign+3;
            }
        }

        $("#hotCity").html(resultHtml);

        resultHtml="";
        for (var j = 1; j <citylist.length; j++)
        {
            var letter=citylist[j].k;
            resultHtml+="<dd><dt data-id='"+j+"'>"+letter+"</dt></dd>";
        }
        $("#lettercity").append(resultHtml);
    }
    else
    {
        var letterArray=citylist[index].n;
        for (var i = 0; i <letterArray.length; i++)
        {
            var cityCode=letterArray[i].c;
            var city=letterArray[i].n;
            var country=letterArray[i].y;
            var end=i==letterArray.length-1?"style='border:none'":"";
            html+="<dl "+end+" onclick='SelectedCity(this)' data-city='"+city+"'><span data-cityCode='"+cityCode+"' data-country='"+country+"'>"+city+"</span></dl>";
        }
        return html;
    }
}


   //获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}