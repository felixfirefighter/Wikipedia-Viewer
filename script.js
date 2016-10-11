/**
 * Created by LEE on 2016/10/10.
 */
$(document).ready(function () {

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

    $("#test").text("");

    var title = $("#search-box").val();

    var url = "";

    //url = "http://en.wikipedia.org/w/api.php?action=query&format=json&list=allpages&apfrom=Hello&aplimit=10&callback=?";
    //url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=Hello&prop=revisions&rvprop=content&callback=?';

    url = "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
        + encodeURI(title) + "&format=json&callback=?";

    $.getJSON(url,function (data) {
        var searchResult = data.query.search;

        searchResult.forEach(function(val){
            $("#test").append(val.title + "<br>");
        });
    });
}