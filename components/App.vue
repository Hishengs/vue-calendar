<template>
	<div id="hs-event-calendar">
		<!-- 头部 -->
		<div class="hs-event-calendar-hd">
			<!--  -->
			<div class="left-arrow">
				<img src="../img/left_arrow.svg" alt="左翻" @click="prevMonth">
			</div>
			<div class="selector">
				<p v-text="headerTitleText"></p>
			</div>
			<div class="right-arrow">
				<img src="../img/right_arrow.svg" alt="右翻" @click="nextMonth">
			</div>
		</div>
		<!-- 主体 -->
		<div class="hs-event-calendar-body">
			<table>
				<tr>
					<td v-for="day in currentMonth.weeks[0]">
						{{ day.day }}
					</td>
				</tr>
				<tr v-for="week in currentMonth.weeks">
					<td v-for="day in week" @click="dayEvent(day)">
						<div :class="'day'+(day.disabled?' disabled':'')+(day.isCurrentDate?' current':'')">
							<span class="day-date">{{ day.year + '-' + day.month + '-' +day.date }}</span>
							<!-- 这里是事件列表 -->
							<ul class="day-events">
								<li v-for="event in day.events">
									<p>{{ event.title }}</p>
								</li>
							</ul>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import dateFormatter from '../util/dateFormatter.js'
	window.dateFormatter = dateFormatter
	import lang from '../util/lang.js'
	export default {
		name: 'App',
		data () {
			return {
				currentDate: new Date(), // 当前日期
				startDayOfWeek: 0, // 一周开始,
				currentMonthDate: new Date(),
				lang: 'zh',
			}
		},
		computed: {
			headerTitleText: function(){
				return this.currentMonthDate.getFullYear() + '年' + (this.currentMonthDate.getMonth()+1) + '月'
			},
			currentMonth: function(){
				// 计算开始的那天
				var firstDayOfMonth = new Date(this.currentMonthDate.getFullYear()+'-'+(this.currentMonthDate.getMonth()+1)+'-1')
				var offset = firstDayOfMonth.getDay()<this.startDayOfWeek?(firstDayOfMonth.getDay()+6-this.startDayOfWeek+1):(firstDayOfMonth.getDay()-this.startDayOfWeek)
				console.log('firstDayOfMonth.getDay',firstDayOfMonth.getDay())
				console.log('offset',offset)
				var startDate = dateFormatter.minus(firstDayOfMonth,offset,'day'), weeks = [], week = []
				console.log('startDate',startDate)
				for(var i=0;i<6;i++){
					week = []
					for(var j=0;j<7;j++){
						var indexDate = dateFormatter.plus(startDate,i*7+j,'day')
						var day = {
							isCurrentDate: dateFormatter.isSameDay(indexDate,this.currentDate),
							index: i*7+j,
							date: indexDate.getDate(),
							day: lang[this.lang].weekNames[indexDate.getDay()],
							month: indexDate.getMonth()+1,
							year: indexDate.getFullYear(),
							disabled: !(indexDate.getMonth()==this.currentMonthDate.getMonth()),
							events: [
								{title:'coffee'},{title:'tea'},{title:'milk'}
							] // 事件列表
						}
						week.push(day)
					}
					weeks.push(week)						
				}
				return {weeks:weeks}
			}
		},
		mounted () {
			console.log('this.currentMonth',this.currentMonth)
		},
		methods: {
			prevMonth () {
				this.currentMonthDate = dateFormatter.minus(this.currentMonthDate,1,'month')
			},
			nextMonth () {
				this.currentMonthDate = dateFormatter.plus(this.currentMonthDate,1,'month')
			},
			dayEvent (day) {
				console.log('day click event trigged.',day)
			}
		}
	}
</script>

<style lang="stylus">
	#hs-event-calendar
		max-width 960px
		min-height 300px
		min-width 300px
		margin 0 auto
		font-size 1em
		.hs-event-calendar-hd
			/*position relative*/
			/*height 30px*/
			text-align center
			.left-arrow
				float left
			.right-arrow
				float right
			.left-arrow, .right-arrow
				margin-top 0.8em
				cursor pointer
				img
					width 22px
					height 22px
			.selector
				/*width 100%*/
				/*text-algin center*/
				display inline-block
				margin 0 auto
		.hs-event-calendar-body
			table
				width 100%
				border-collapse collapse
				p
					margin 0
					padding 0
				tr
					td
						border 1px solid #eee
						padding 0
						cursor pointer
						.day
							min-height 60px
							height 100%
							width 100%
							position relative
							.day-date
								position absolute
								left 3px
								top 3px
								color #888
								font-size 12px
							.day-events
								margin 0
								padding-top 10px
						.day.disabled
							background-color #f5f5f5
							color #888
						.day.current
							background-color #bcdff4
</style>