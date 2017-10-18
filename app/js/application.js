'use strict'

$(function () {
  new OffsetClassName('header', 'scroll-header', 300, 30)
  new LandingNav('.nav')
  var timer
  dataLoader(function (data) {
    var date = new Date(data.releaseDate)
    if (timer) { return timer.setEndTime(date) }
    timer = new Timer('.timer', date)
  })
  // new BonusList(
  //   '.ico-details__content-bonus-days',
  //   [
  //     {id: '#day-1-2', value: 0.3},
  //     {id: '#day-2-5', value: 0.15},
  //     {id: '#day-5-10', value: 0.07},
  //     {id: '#day-10-30', value: 0.03}
  //   ]
  // )
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
  // new Counters('#participants', '#countries', '#money')
  // new CommittedProgress('.commit-progress')
  new MobileMenu('#menu-toggle', '.menu-close, #app-nav a, #app-nav .stay-updated-btn', '#app-nav')

  // new Dropdown('#languages-dropdown-toggle', '#languages-dropdown-menu')
  // new Dropdown('#languages-dropdown-toggle-mobile', '#languages-dropdown-menu-mobile')
})
