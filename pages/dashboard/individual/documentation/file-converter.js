var pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc = "./assets/js/pdf.worker.js";

const UrlUploader = (url) => {
  fetch(url).then((response) => {
    response.blob().then((blob) => {
      let reader = new FileReader();
      reader.onload = (e) => {
        const data = atob(e.target.result.replace(/.*base64,/, ""));
        renderPage(data);
      };
      reader.readAsDataURL(blob);
    });
  });
};

useMemo(() => {
  UrlUploader(props.pdfUrl);
}, []);

const renderPage = async (data) => {
  setLoading(true);
  const imagesList = [];
  const canvas = document.createElement("canvas");
  canvas.setAttribute("className", "canv");
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  for (let i = 1; i <= pdf.numPages; i++) {
    var page = await pdf.getPage(i);
    var viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    var render_context = {
      canvasContext: canvas.getContext("2d"),
      viewport: viewport,
    };
    await page.render(render_context).promise;
    let img = canvas.toDataURL("image/png");
    imagesList.push(img);
  }
  setNumOfPages((e) => e + pdf.numPages);
  setImageUrls((e) => [...e, ...imagesList]);
};