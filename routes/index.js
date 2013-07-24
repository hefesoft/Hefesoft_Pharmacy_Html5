
/*
 * GET home page.
 */

exports.index = function(req, res){
    /*if(is_mobile(req))
    {
        res.render('index_movil', { title: 'Hefesoft Pharmacy Mobile' });      
    }
    else
    {
        res.render('index', { title: 'Hefesoft Pharmacy Desktop' });      
    }*/
  
    res.render('index', { title: 'Hefesoft Pharmacy Desktop' });
    //res.render('index_movil', { title: 'Hefesoft Pharmacy Mobile' });      
};

/*function is_mobile(req) {
    var ua = req.header('user-agent');
    if (/mobile/i.test(ua)) return true;
    else return false;
};*/