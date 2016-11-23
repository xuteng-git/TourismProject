$(function()
{
    load();
    
    $(".feiji-select").click(function(){
        window.location="list.html";
    });

    $("#trip").click(function(){ 
     hasClass(this,"back","bottom_selected");
     $("#backtime").css("visibility","hidden");
    });

    $("#back").click(function(){ 
        hasClass(this,"trip","bottom_selected");
        $("#backtime").css("visibility","");
    });


    $("#img").rotate({bind: { click: function(){
        $(this).rotate({ angle:0,animateTo:180,easing: $.easing.easeInOutExpo });
        var state=$(this).parent().prev().children().eq(0).html();
        var end=$(this).parent().next().children().eq(0).html();
        $(this).parent().prev().children().eq(0).html(end);
        $(this).parent().next().children().eq(0).html(state);

        //var a=$(".leftinformation").offset().left;
        //var b=$(window).width();
        //var c=729-a;
        //$(".leftinformation").css('right','0px');
        //$(".rightinformation").css('left','0px');
        //alert($(".leftinformation").css('left'));
        //alert($(".leftinformation").width());
        //alert($(".leftinformation").offset());

     /*   if($("#q").hasClass("tR"))
        {
           // $(".leftinformation").removeClass().addClass("leftinformation");
           // $(".rightinformation").removeClass().addClass("rightinformation");

            $("#q").removeClass();
            $("#w").removeClass();

            $("#q").animate({left:"0px"});
            $("#w").animate({right:"0px"});
            // $(".leftinformation").addClass("tL");
            // $(".rightinformation").addClass("tR");

        }else{
        $("#q").addClass("tR");
        $("#w").addClass("tL");
        $("#q").animate({right:"0px"});
        $("#w").animate({left:"0px"});
         $("#q").removeClass();
            $("#w").removeClass();
        }*/

       // $(".leftinformation").animate({right:"100px"},1000);
       // $(".rightinformation").animate({left:"100"},1000);
   }} }); 
});

function hasClass(sourceobj,targetID,className)
{
    if ($(sourceobj).hasClass(className))
    {
        $(sourceobj).removeClass(className);
        $("#"+targetID).addClass(className);
    }else
    {
        $(sourceobj).addClass(className);
        $("#"+targetID).removeClass(className);
    }
}




   function load()
   {
     var day = new Date();
     var y=day.getFullYear();
     var m=day.getMonth()+1;
     var d=day.getDate();
     var w=getWeekend(day.getDay());
     localStorage.triptime = y+"-"+m+"-"+d;
     $("#triptime").html(m+"月"+d+"日 "+w);

     day.setDate(d+2);
     y=day.getFullYear();
     m=day.getMonth()+1;
     d=day.getDate();
     w=getWeekend(day.getDay());  
     localStorage.backtime = y+"-"+m+"-"+d;
     $("#backtime").html(m+"月"+d+"日 "+w);

     if(localStorage.triptime!="")
     {
        $("#tripCity").html();
        $("#backCity").html();
     }
     
 }

   //计算天数差的函数，通用  
   function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式  
     var  aDate,  oDate1,  oDate2,  iDays  
     aDate  =  sDate1.split("-")  
       oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]) //转换为12-18-2006格式  
       aDate  =  sDate2.split("-")  
       oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
       iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24) //把相差的毫秒数转换为天数  
       return  iDays  
   }   


   function getWeekend(i)
   {
    var day=new Array(7)
    day[0]="星期日";
    day[1]="星期一";
    day[2]="星期二";
    day[3]="星期三";
    day[4]="星期四";
    day[5]="星期五";
    day[6]="星期六";
    return day[i];
}