/**
 * Created by LEE on 2016/10/10.
 */
$(document).ready(function () {

    var pink = colorPink.c500;

    $("#random-button").on("click",function () {
        $("body").animate({backgroundColor:colorPink.c500},1000);
        $("#list-container a").animate({borderColor:colorPink.c500},1000)
            .hover(function(){
                $(this).css("border-color","white")
            },
            function () {
                $(this).css("border-color",colorPink.c500);
            });
    });

    $("#search-box").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            searchWiki();
        }
    });
});

function searchWiki() {
    //http://en.wikipedia.org/w/api.php?action=query
    // &prop=revisions&rvprop=content&titles="+title+"&format=json&callback=?
    //api.php?action=query&list=allpages&apfrom=Kre&aplimit=5

    var listContainer = $("#list-container");
    var masterContainer = $("#master-container");

    listContainer.text("");

    var title = $("#search-box").val();
    if(title == ""){
        masterContainer.attr("class","vertical-center");
    }

    var url = "";
    var itemUrl = "";
    var snippetStr = "";

    //url = "http://en.wikipedia.org/w/api.php?action=query&format=json&list=allpages&apfrom=Hello&aplimit=10&callback=?";
    //url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=Hello&prop=revisions&rvprop=content&callback=?';

    url = "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
        + encodeURI(title) + "&format=json&callback=?";

    $.getJSON(url, function (data) {
        var searchResult = data.query.search;

        masterContainer.attr("class", "");

        searchResult.forEach(function (val) {
            itemUrl = "https://en.wikipedia.org/wiki/" + val.title;
            snippetStr = val.snippet;

            listContainer.hide();

            listContainer.append(
                //assign a link to the proper
                $("<a>").attr({
                    "href": itemUrl,
                    "target": "_blank",
                    "class": "list-group-item"
                }).append(
                    $("<h2>")
                        .append(val.title))
                    .append($("<p>").append(snippetStr)
                    )
            );
        });
        listContainer.show("slide", {direction: "down"});
    });


}