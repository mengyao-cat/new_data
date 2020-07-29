$(function(){
    
$.ajaxPrefilter(function(option){
    option.url='http://192.168.50.200:3007'+ option.url;
});
})