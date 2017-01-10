export default {
	format: function(date){
		var month = date.getMonth() + 1, day = date.getDate()
		return date.getFullYear() + '-' + (month>=10?month:'0'+month) + '-' + (day>=10?day:'0'+day)
	},
	manipulate: function(date,num,timeType){
		// console.log('arguments',arguments)
		var year = parseInt(date.getFullYear())
		var month = parseInt(date.getMonth()+1)
		var day = parseInt(date.getDate())
		if(typeof num !== 'number' || num === 0)return date
		var actionType = num>0?'plus':'minus'
		var atom = actionType==='plus'?1:-1
		var _date = {year: year, month: month, day: day}
		switch(timeType.toLowerCase()){
			case 'y':
			case 'year':
				for(var i=0;i<Math.abs(num);i++){
					_date.year += atom
					_date = this.justify(_date,actionType,timeType)
				}
				return new Date(_date.year+'-'+_date.month+'-'+_date.day)
				break
			case 'm':
			case 'month':
				for(var i=0;i<Math.abs(num);i++){
					_date.month += atom
					_date = this.justify(_date,actionType,timeType)
				}
				return new Date(_date.year+'-'+_date.month+'-'+_date.day)
				break
			case 'd':
			case 'day':
				for(var i=0;i<Math.abs(num);i++){
					_date.day += atom
					_date = this.justify(_date,actionType,timeType)
				}
				return new Date(_date.year+'-'+_date.month+'-'+_date.day)
				break
			default:
				return date
				break
		}
	},
	plus: function(date,num,timeType){
		return this.manipulate(date,+num,timeType)
	},
	add: function(date,num,timeType){return this.plus(date,num,timeType)},
	minus: function(date,num,timeType){
		return this.manipulate(date,-num,timeType)
	},
	substract: function(date,num,timeType){return this.minus(date,num,timeType)},
	justify: function(date,actionType,timeType){
		var isLeapYear = this.isLeapYear(date.year) // 是否是闰年
		switch(timeType.toLowerCase()){
			case 'y':
			case 'year':
				// 针对二月做平年闰年调整
				if(date.month==2){
					if(isLeapYear){ // 之前是平年
						date.day = date.day==28?29:date.day
					}else date.day = date.day==29?28:date.day
				}
				break
			case 'm':
			case 'month':
				// 根据是否超过12月做年份调整
				if(date.month>12){
					return this.justify({year:date.year+1,month:date.month-12,day:date.day},'plus','year')
				}else {
					if(date.month<=0){
						return this.justify({year:date.year-1,month:12,day:31},'minus','year')
					}else {
						var isBigMonth = this.isBigMonth(date.month)
						var originalMonth = actionType==='plus'?(date.month-1):(date.month+1) // 原来的月份
						if(originalMonth===13){
							originalMonth = 1
							--date.year
						}
						if(originalMonth===0){
							originalMonth = 12
							++date.year
						}
						var isEndOfMonth = this.isEndOfMonth(date.day,originalMonth,date.year)
						// 大小月份调整
						if(isBigMonth){
							date.day = isEndOfMonth?31:date.day
						}else {
							date.day = isEndOfMonth?(date.month===2?(isLeapYear?29:28):30):date.day
						}
					}
				}
				break
			case 'd':
			case 'day':
				var endOfMonth = this.getEndOfMonth(date.month,date.year)
				if(date.day>endOfMonth){
					return this.justify({year:date.year,month:date.month+1,day:date.day-endOfMonth},'plus','month')
				}
				if(date.day<=0){
					date.month = (date.month-1)==0?12:date.month-1
					date.day = this.getEndOfMonth(date.month,date.year)
					return this.justify({year:date.year,month:date.month,day:date.day},'minus','month')
				}
				break
			default:
				break
		}
		// console.log('justifyRes',date)
		return date
	},
	// 是否是闰年
	isLeapYear: function(year){
		return (year%4===0)&&(year%100!==0)
	},
	isBigMonth: function(month){
		return (month==1||month==3||month==5||month==7||month==8||month==10||month==12)
	},
	// 是否是月末
	isEndOfMonth: function(day,month){
		var isLeapYear = arguments[2]?this.isLeapYear(arguments[2]):false
		if(this.isBigMonth(month))return day===31
		else return month===2?(isLeapYear?day===29:day===28):day===30
	},
	getEndOfMonth: function(month){
		// console.log('getEndOfMonth.arguments',arguments)
		var isLeapYear = arguments[1]?this.isLeapYear(arguments[1]):false
		if(this.isBigMonth(month))return 31
		else {
			if(month===2)return isLeapYear?29:28
			else return 30
		}
	},
	// 计算一个日期在一年中是第几天
	countDaysOfYear (date) {
		var month = date.getMonth()+1, dayIndex = 0
		for(var i=1;i<=month;i++){
			if(this.isBigMonth(i)){
				dayIndex += 31
			}else {
				if(i==2){
					if(this.isLeapYear(date.getFullYear()))dayIndex += 29
					else dayIndex += 28
				}else dayIndex += 30
			}
		}
		return dayIndex
	},
	isSameDay: function(dateA,dateB){
		return ((dateA.getFullYear()+'-'+dateA.getMonth()+'-'+dateA.getDate())===(dateB.getFullYear()+'-'+dateB.getMonth()+'-'+dateB.getDate()))
	}
}