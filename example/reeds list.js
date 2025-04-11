const mine = new MinerHelperClass(
  document.querySelectorAll('main article .card-body header'),
  {
    tittle     : 'h2 a',
    url        : {e:'h2 a', a:'href'},
    company    : 'header div a',
    comany_url : {e: 'header div a', a:'href'}
  },
  'url',
  'http://anyserver/reeds-urls',
  document.querySelectorAll('main .card nav')[0], 
  'Next'
);
mine.loop();


