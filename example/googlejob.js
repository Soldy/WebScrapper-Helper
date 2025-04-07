const googleJobList = function(){
    for (const i of document.querySelectorAll('c-wiz c-wiz li a'))
        console.log("https://www.google.com/about/careers/applications/"+(i.getAttribute('href').split('?'))[0]);
};

const googleNext = function(){
    cH.clickSmart(document.getElementsByTagName('body')[0], 'Go to next page');
};

const googleListAndNext = function(){
    googleJobList();
    googleNext();
};


setTimeout(googleListAndNext, 5000); 