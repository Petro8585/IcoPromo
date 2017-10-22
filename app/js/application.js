'use strict'

$(function () {
  new OffsetClassName('header', 'scroll-header', 150, 30)
  new LandingNav('.nav')
  var timer
  dataLoader(function (data) {
    var date = new Date(data.releaseDate)
    if (timer) { return timer.setEndTime(date) }
    timer = new Timer('.timer', date)
  })
  new BonusList(
    '.ico-details__content-bonus-days',
    [
      {id: '#1-month', value: 0.01},
      {id: '#3-month', value: 0.05},
      {id: '#6-month', value: 0.125},
      {id: '#9-month', value: 0.20},
      {id: '#12-month', value: 0.275}
    ]
  )
  new TreeEffects('.roadmap-tree')
  new ShowAll('.why-rentberry__content-videos', '#showAllVideos', '.why-rentberry__content-videos-list')
  new ShowAll('.all-team-wrapper', '#showAllTeam', '.all-team')
  new ShowAll('#allInvestors', '#showAllInvestors', '#allInvestorsList')
  new ShowAll('#allAdvisors', '#showAllAdvisors', '#allAdvisorsList')
  new ScrollTop('#logo')
  new ScrollTop('#footer-logo')

  var slowScrolls = [
    new SlowScroll('.first-screen__content', 0.4, false),
    new SlowScroll('.first-screen__city', 0.2, false),
    new SlowScroll('.whitepaper', 0.4, true, -660),
    new SlowScroll('.orange-block__city', 0.2, true),
    new SlowScroll('.why-rentberry__content', 0.4, true, 200),
    new SlowScroll('.why-rentberry__city', 0.2, true, -200)
  ]
  manageSlowScrolls(slowScrolls)

  new Animations()
  new Counters('#participants', '#countries', '#money')
  new CommittedProgress('.commit-progress')
  new MobileMenu('#menu-toggle', '.menu-close, #app-nav a, #app-nav .stay-updated-btn', '#app-nav')
  new EventList('.roadshow-component')
})
