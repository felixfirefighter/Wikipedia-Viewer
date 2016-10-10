/**
 * Created by LEE on 2016/10/10.
 */
$(document).ready(function () {

    searchWiki();

    $("#search-button").click(function () {
       searchWiki();
    });

    $("#search-box").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            searchWiki();
        }
    });
});

function searchWiki(){
    //http://en.wikipedia.org/w/api.php?action=query
    // &prop=revisions&rvprop=content&titles="+title+"&format=json&callback=?
    //api.php?action=query&list=allpages&apfrom=Kre&aplimit=5

    $("#test").text("Working");

    //var title = $("#search-box").val();

    var url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content" +
        "&list=allpages&apfrom=Kre&aplimit=10&format=json&callback=?";

    url = "http://en.wikipedia.org/w/api.php?action=query&format=json&list=allpages&apfrom=Kre&aplimit=10&callback=?";

    //url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=India&prop=revisions&rvprop=content&callback=?';

    //api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=jsonfm
    
    $.getJSON(url,function (data) {
        var allpages = data.query.allpages;

        allpages.forEach(function(val){
            var search = encodeURI(val.title);
            $("#test").text(search);
        });
    });
}