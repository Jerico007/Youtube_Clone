let apiKey = "AIzaSyAZdnIKGBcCPitlE2NMYX1fqURJ5wFOgEQ";

const container = document.getElementsByClassName("container")[0];



let searchButton = document.getElementById("search");



function addDataToUI(videoData) {
    container.innerHTML = "";
    videoData.forEach((value) => {
      let obj = value.snippet;
      let video_div = document.createElement("div");
      video_div.classList.add("video");
      video_div.innerHTML = `
      <a id="${value.id.videoId}" href="youtube_videoPage.html?video_id=${value.id.videoId}"><img
        src="${obj.thumbnails.high.url}"
        class="thumbnail"
      /></a>
      <p>${obj.title}</p>
      <b>${obj.channelTitle}</b>
      `;
      container.appendChild(video_div);
    });
  }
  
  async function searchString(value) {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${value}&key=${apiKey}`;
    
    let response = await fetch(url, { method: "GET" });
  
    let result = await response.json();
  
    console.log(result);
    addDataToUI(result.items);
  }
  
  searchButton.addEventListener("click", () => {
  
    let str = document.getElementsByTagName("input")[0];
    if (str.value === "") {
      return;
    }
    let str_value = str.value.trim();
    searchString(str_value);
  });