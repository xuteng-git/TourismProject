$(function(){
    var activity=20;

    /*************    方法     **************/
    //判断是否是闰年,计算每个月的天数
    function leapYear(year){
        var isLeap = year%100==0 ? (year%400==0 ? 1 : 0) : (year%4==0 ? 1 : 0);
        return new Array(31,28+isLeap,31,30,31,30,31,31,30,31,30,31);
    }

    //获得某月第一天是周几
    function firstDay(day){
        return day.getDay();
    }

    //获得当天的相关日期变量
    function dateNoneParam(){
        var day = new Date();
        var today = new Array();
        today['year'] = day.getFullYear();
        today['month'] =day.getMonth();
        today['date'] = day.getDate();
        today['hour'] = day.getHours();
        today['minute'] = day.getMinutes();
        today['second'] = day.getSeconds();
        today['week'] = day.getDay();
        today['firstDay'] = firstDay(new Date(today['year'],today['month'],1));
        return today;
    }

    //获得所选日期的相关变量
    function dateWithParam(year,month){
        var day = new Date(year,month);
        var date = new Array();
        date['year'] = day.getFullYear();
        date['month'] = day.getMonth();
        date['date'] = day.getDate();
        date['firstDay'] = firstDay(new Date(date['year'],date['month'],1));
        return date;
    }

    //生成日历代码 的方法
    //参数依次为 年 月 日 当月第一天(是星期几)
    function kalendarCode(codeYear,codeMonth,codeDay,codeFirst,type)
    {
        kalendar_html+="  <div class='date-list'><div class='title'>"+codeYear+"年"+codeMonth+"月</div><div class='content'>";
        //日 列表
        for(var m=0;m<5;m++){//日期共 4-6 行

            if(m >= Math.ceil((codeFirst+monthDays[codeMonth])/7)){//第五、六行是否隐藏
                kalendar_html += "<ul class='dayList hide dayListHide"+m+"'>\n";
            }else{
                kalendar_html += "<ul class='dayList dayListHide"+m+"'>\n";
            }

            for(var n=0;n<7;n++){//列
                if((7*m+n) < codeFirst || (7*m+n) >= (codeFirst+monthDays[codeMonth])){//某月日历中不存在的日期
                    kalendar_html += "<li></li>";
                }else
                {
                    if(type==1)
                    {

                        if((7*m+n+1-codeFirst == codeDay)&&(((7*m+n)%7 == 0) || ((7*m+n)%7 == 6))){//当天是周末
                            kalendar_html += "<li><div class='today'>"+(7*m+n+1-codeFirst)+"</div><span class='sign'>今天</span></li>";
                        }else  if((7*m+n+1-codeFirst)==codeDay+1){//明天
                            kalendar_html += "<li>"+(7*m+n+1-codeFirst)+"<span class='sign'>明天</span></li>";
                        }
                        else  if((7*m+n+1-codeFirst)==codeDay+2){//后天
                            kalendar_html += "<li>"+(7*m+n+1-codeFirst)+"<span class='sign'>后天</span></li>";
                        }
                        else  if((7*m+n+1-codeFirst)==activity){//已选择日期
                            kalendar_html += "<li><div class='activity'>"+(7*m+n+1-codeFirst)+"</div><span class='sign'>去程</span></li>";
                        } else if((7*m+n+1-codeFirst)<codeDay){//已过期日期
                            kalendar_html += "<li class='invalid'>"+(7*m+n+1-codeFirst)+"</li>";
                        }
                        else if(((7*m+n)%7 == 0) || ((7*m+n)%7 == 6)){//仅是周末
                            kalendar_html += "<li class='weekend'>"+(7*m+n+1-codeFirst)+"</li>";
                        }else if(7*m+n+1-codeFirst == codeDay){//仅是当天
                            kalendar_html += "<li><div class='today'>"+(7*m+n+1-codeFirst)+"</div><span class='sign'>今天</span></li>";
                        }else{//其他日期
                            kalendar_html += "<li>"+(7*m+n+1-codeFirst)+"</li>";
                        }
                    }else
                    {
                        if(((7*m+n)%7 == 0) || ((7*m+n)%7 == 6)){//仅是周末
                            kalendar_html += "<li class='weekend'>"+(7*m+n+1-codeFirst)+"</li>";
                        }else{
                        kalendar_html += "<li>"+(7*m+n+1-codeFirst)+"</li>";
                        }
                    }
                }
            }
            kalendar_html += "</ul>\n";
        }
        return kalendar_html+"</div></div>";
    }



    /*************    缓存节点和变量     **************/
    var rili_location = $('#wrap');//日历代码的位置
    var kalendar_html = '';//记录日历自身代码 的变量
    var yearfloor = 10;//选择年份从1970到当前时间的后10年

    /*************   将日历代码放入相应位置，初始时显示此处内容      **************/

    //获取时间，确定日历显示内容
    var today = dateNoneParam();//当天

    /*月-日 设置*/
    var month = new Array('一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月');
    var monthDays = leapYear(today['year']);//返回数组，记录每月有多少天
    var weekDay = new Array('日','一','二','三','四','五','六');
    // alert('年:'+someDay['year']+'\n月:'+someDay['month']+'\n日:'+someDay['date']+'\n星期:'+someDay['week']+'\n本月第一天星期:'+someDay['firstDay']);return false;

    kalendar_html = kalendarCode(today['year'],today['month']+1,today['date'],today['firstDay'],1);
   /* today=dateWithParam(2016,11);
    kalendar_html = kalendarCode(today['year'],today['month'],today['date'],today['firstDay'],2);
    today=dateWithParam(2017,1);
    kalendar_html = kalendarCode(today['year'],today['month'],today['date'],today['firstDay'],2);*/
    var temp=0;
    for(var j=1;j<=6; j++)
    {
        var y=today['year'];
        var m=today['month']+j;
        if(m==11)
        {
            today=dateWithParam(y,11);
            kalendar_html = kalendarCode(today['year'],today['month']+1,today['date'],today['firstDay'],2);
        }else if(m>12)
        {
            today=dateWithParam(y+1,temp);
            kalendar_html = kalendarCode(today['year'],today['month']+1,today['date'],today['firstDay'],2);
            temp++;
        }else
        {
            today=dateWithParam(y,temp);
            kalendar_html = kalendarCode(today['year'],today['month']+1,today['date'],today['firstDay'],2);
            temp++;
        }
    }
    $("#content").html(kalendar_html);
});