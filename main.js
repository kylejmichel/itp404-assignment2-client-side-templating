const postsTemplate = Handlebars.compile(
  document.getElementById("postsTemplate").innerHTML
)

Handlebars.registerHelper('commas', function(subscribers) {
  return Number(subscribers).toLocaleString('en')
})

$(".search").on("submit", async function(e){
  e.preventDefault();
  let loader = document.createDocumentFragment();
  let loading = document.createElement('div');
  $(loading).addClass('loader');
  $(loading).html('Loading...')
  loader.append(loading)
  $('#results').html(loader)
  try{
    let q = $('input[name="search"]').val();
    let posts = await $.ajax({
      type: 'GET',
      url: 'https://www.reddit.com/r/' + q + '.json'
    });
    let sanitzedHtml = postsTemplate({
      posts: posts.data.children
    });
    $('#results').html(sanitzedHtml)
  } catch(error) {
    $('#results').html('Oops, something went wrong!')
  }
});
