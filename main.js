  const postsTemplate = Handlebars.compile(
  document.getElementById("postsTemplate").innerHTML
  )

 $(".search").on("submit", function(e){
   e.preventDefault();
  let loader = document.createDocumentFragment();
  let loading = document.createElement('div');
  $(loading).addClass('loader');
  $(loading).html('Loading...')
  loader.append(loading)
  $('#results').html(loader)

  let q = $('input[name="search"]').val();

    $.ajax({
      type: 'GET',
      url: 'https://www.reddit.com/r/' + q + '.json'
    }).then((posts) =>  {

      console.log(posts)
      let sanitzedHtml = postsTemplate({
        posts: posts.data.children
      });

      $('#results').html(sanitzedHtml)

    });
});
