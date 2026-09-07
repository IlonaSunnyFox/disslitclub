import fs from 'node:fs/promises';
import path from 'node:path';

const covers = {
  1: {
    1:['https://imo10.labirint.ru/books/391192/cover.jpg/242-0'],
    2:['https://imo10.labirint.ru/books/794336/cover.jpg/242-0','https://fantlab.ru/images/editions/big/115949?r=1667427082'],
    3:['https://imo10.labirint.ru/books/672589/cover.jpg/242-0'],
    4:['https://ic.pics.livejournal.com/victorova_taja/84836790/21335/21335_original.jpg'],
    5:['https://imo10.labirint.ru/books/917570/cover.jpg/242-0'],
    6:['https://imo10.labirint.ru/books/662256/cover.jpg/242-0'],
    7:['https://imo10.labirint.ru/books/765156/cover.jpg/242-0'],
    8:['https://www.moscowbooks.ru/image/book/743/orig/i743606.jpg?cu=20220215120501'],
    9:['https://www.mann-ivanov-ferber.ru/assets/images/covers/96/16696/2.00x-thumb.png'],
    10:['https://imo10.labirint.ru/books/252055/cover.jpg/242-0'],
    11:['https://fantlab.ru/images/editions/big/135838?r=1492542840']
  },
  2: {
    1:['https://cdn.litres.ru/pub/c/cover_415/36302933'],2:['https://akonit.net/image/cache/catalog/feed_3/14568-329793-1000x1000.jpg'],3:['https://avatars.mds.yandex.net/get-mpic/12390410/2a0000019a8c66c6bbc301d8e5862fa96997/orig'],4:['https://bookcover.longitood.com/bookcover?book_title=%D0%A1%D0%B5%D0%BC%D0%B8%D0%BB%D0%B5%D1%82%D0%BD%D1%8F%D1%8F%20%D0%BD%D0%BE%D1%87%D1%8C&author_name=%D0%A7%D0%BE%D0%BD%20%D0%AE%D1%87%D0%B6%D0%BE%D0%BD&image_size=medium'],5:['https://fantlab.ru/images/editions/big/153940'],6:['https://imo10.labirint.ru/books/913990/cover.jpg/242-0'],7:['https://cdn.litres.ru/pub/c/cover_415/9308621'],8:['https://content1.rozetka.com.ua/goods/images/big/247628542.jpg'],9:['https://cdn.azbooka.ru/cv/w1100/637094cc-17cc-4d7f-a5ce-0459be236d72.jpg'],10:['https://bookcover.longitood.com/bookcover?book_title=%D0%92%D0%BE%D0%B7%D0%B2%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%20%D0%91%D1%80%D0%B0%D0%B9%D0%B4%D1%81%D1%85%D0%B5%D0%B4&author_name=%D0%98%D0%B2%D0%BB%D0%B8%D0%BD%20%D0%92%D0%BE&image_size=medium']
  },
  3: {
    1:['https://bookcover.longitood.com/bookcover?book_title=%D0%92%D0%BE%D0%BB%D1%88%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F%20%D0%B3%D0%BE%D1%80%D0%B0&author_name=%D0%A2%D0%BE%D0%BC%D0%B0%D1%81%20%D0%9C%D0%B0%D0%BD%D0%BD&image_size=medium'],2:['https://murawei.de/media/catalog/product/cache/de5b36c8357941ed9e0a02508c695420/r/0/r019457_1.jpg'],3:['https://knygy.com.ua/pix/f5/f9/5b/f5f95b830c5a9281c622300142a6a2b8.jpg'],4:['https://api.slavbibl.ru/media/books/83da72e98e0b3451d88ad22b2549d5c8.jpg'],5:['https://content.img-gorod.ru/pim/products/images/e3/1b/018f5f8e-186a-71bb-a915-7c6b31e2e31b.jpg'],6:['https://bookcover.longitood.com/bookcover?book_title=%D0%9A%D0%BE%D0%BA%D0%BE%D0%BD&author_name=%D0%A7%D0%B6%D0%B0%D0%BD%20%D0%AE%D1%8D%D0%B6%D0%B0%D0%BD%D1%8C&image_size=medium'],7:['https://bookcover.longitood.com/bookcover?book_title=%D0%9F%D0%BE%D0%BB%D0%BD%D0%BE%D1%87%D0%BD%D0%B0%D1%8F%20%D0%B1%D0%B8%D0%B1%D0%BB%D0%B8%D0%BE%D1%82%D0%B5%D0%BA%D0%B0&author_name=%D0%9C%D1%8D%D1%82%D1%82%20%D0%A5%D0%B5%D0%B9%D0%B3&image_size=medium'],8:['https://murawei.de/media/catalog/product/cache/de5b36c8357941ed9e0a02508c695420/r/0/r015367_1.jpg'],9:['https://akonit.net/image/cache/catalog/feed_3/42722-328609-720x720.jpg'],10:['https://bookcover.longitood.com/bookcover?book_title=%D0%9A%D0%BE%D1%82%D0%BB%D0%BE%D0%B2%D0%B0%D0%BD&author_name=%D0%90%D0%BD%D0%B4%D1%80%D0%B5%D0%B9%20%D0%9F%D0%BB%D0%B0%D1%82%D0%BE%D0%BD%D0%BE%D0%B2&image_size=medium'],11:['https://bookcover.longitood.com/bookcover?book_title=%D0%A7%D1%83%D0%BC%D0%BD%D1%8B%D0%B5%20%D0%BD%D0%BE%D1%87%D0%B8&author_name=%D0%9E%D1%80%D1%85%D0%B0%D0%BD%20%D0%9F%D0%B0%D0%BC%D1%83%D0%BA&image_size=medium']
  },
  4: {
    1:['https://m-bulgakov.ru/wp-content/uploads/mim2.jpg','https://i.ebayimg.com/00/s/MTYwMFgxMTUy/z/JAUAAOSwigla7YdU/%24_57.JPG?set_id=8800005007'],2:['https://bookcover.longitood.com/bookcover?book_title=%D0%9B%D1%83%D0%BD%D0%B0%20%D0%B8%20%D0%B3%D1%80%D0%BE%D1%88&author_name=%D0%A1%D0%BE%D0%BC%D0%B5%D1%80%D1%81%D0%B5%D1%82%20%D0%9C%D0%BE%D1%8D%D0%BC&image_size=medium'],3:['https://bookcover.longitood.com/bookcover?book_title=%D0%97%D0%B0%D0%BC%D0%BE%D0%BA%20%D0%91%D1%80%D0%BE%D1%83%D0%B4%D0%B8&author_name=%D0%90%D1%80%D1%87%D0%B8%D0%B1%D0%B0%D0%BB%D1%8C%D0%B4%20%D0%9A%D1%80%D0%BE%D0%BD%D0%B8%D0%BD&image_size=medium'],4:['https://images.polkaknig.eu/2149/taynaya-istoriya-2149_01KC6D01T2FW8D9MAHG7H4W775.webp'],5:['https://bookcover.longitood.com/bookcover?book_title=%D0%A5%D0%B0%D0%B7%D0%B0%D1%80%D1%81%D0%BA%D0%B8%D0%B9%20%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C&author_name=%D0%9C%D0%B8%D0%BB%D0%BE%D1%80%D0%B0%D0%B4%20%D0%9F%D0%B0%D0%B2%D0%B8%D1%87&image_size=medium'],6:['https://bookcover.longitood.com/bookcover?book_title=%D0%9F%D0%BE%D0%B4%D1%81%D1%82%D1%80%D0%BE%D1%87%D0%BD%D0%B8%D0%BA&author_name=%D0%9B%D0%B8%D0%BB%D0%B8%D0%B0%D0%BD%D0%BD%D0%B0%20%D0%9B%D1%83%D0%BD%D0%B3%D0%B8%D0%BD%D0%B0&image_size=medium'],7:['https://upload.wikimedia.org/wikipedia/commons/9/97/%D0%A0%D0%BE%D0%BC%D0%B0%D0%BD_%D1%81_%D0%BA%D0%BE%D0%BA%D0%B0%D0%B8%D0%BD%D0%BE%D0%BC.jpg'],8:['https://bookcover.longitood.com/bookcover?book_title=%D0%9A%D1%80%D0%B5%D0%BC%D1%83%D0%BB%D1%8F%D1%82%D0%BE%D1%80&author_name=%D0%A1%D0%B0%D1%88%D0%B0%20%D0%A4%D0%B8%D0%BB%D0%B8%D0%BF%D0%B5%D0%BD%D0%BA%D0%BE&image_size=medium'],9:['https://bookcover.longitood.com/bookcover?book_title=%D0%A1%D1%83%D1%82%D1%8C%20%D0%B2%D0%B5%D1%89%D0%B8&author_name=%D0%90%D0%BB%D1%91%D0%BD%D0%B0%20%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B8%D0%BD%D0%B0&image_size=medium'],10:['https://bookcover.longitood.com/bookcover?book_title=%D0%A2%D1%80%D0%B5%D0%B2%D0%BE%D0%B6%D0%BD%D1%8B%D0%B5%20%D0%BB%D1%8E%D0%B4%D0%B8&author_name=%D0%A4%D1%80%D0%B5%D0%B4%D1%80%D0%B8%D0%BA%20%D0%91%D0%B0%D0%BA%D0%BC%D0%B0%D0%BD&image_size=medium']
  },
  5: {
    1:['https://bookcover.longitood.com/bookcover?book_title=%D0%97%D0%B0%D0%B4%D0%B0%D1%87%D0%B0%20%D1%82%D1%80%D1%91%D1%85%20%D1%82%D0%B5%D0%BB&author_name=%D0%9B%D1%8E%20%D0%A6%D1%8B%D1%81%D0%B8%D0%BD%D1%8C&image_size=medium'],2:['https://bookcover.longitood.com/bookcover?book_title=%D0%A7%D1%83%D0%BC%D0%B0&author_name=%D0%90%D0%BB%D1%8C%D0%B1%D0%B5%D1%80%20%D0%9A%D0%B0%D0%BC%D1%8E&image_size=medium'],3:['https://bookcover.longitood.com/bookcover?book_title=%D0%A1%D0%B5%D0%B4%D1%8C%D0%BC%D0%B0%D1%8F%20%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F%20%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0&author_name=%D0%9B%D0%BE%D1%80%D0%B0%D0%BD%20%D0%91%D0%B8%D0%BD%D0%B5&image_size=medium'],4:['https://simg.marwin.kz/media/catalog/product/cache/41deb699a7fea062a8915debbbb0442c/f/u/fullimage5_1158.jpg'],5:['https://bookcover.longitood.com/bookcover?book_title=%D0%9E%D0%B1%D1%8B%D0%BA%D0%BD%D0%BE%D0%B2%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F%20%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D1%8F&author_name=%D0%98%D0%B2%D0%B0%D0%BD%20%D0%93%D0%BE%D0%BD%D1%87%D0%B0%D1%80%D0%BE%D0%B2&image_size=medium'],6:['https://bookcover.longitood.com/bookcover?book_title=%D0%92%D0%B5%D0%B4%D0%B8%20%D1%81%D0%B2%D0%BE%D0%B9%20%D0%BF%D0%BB%D1%83%D0%B3%20%D0%BF%D0%BE%20%D0%BA%D0%BE%D1%81%D1%82%D1%8F%D0%BC%20%D0%BC%D0%B5%D1%80%D1%82%D0%B2%D0%B5%D1%86%D0%BE%D0%B2&author_name=%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0%20%D0%A2%D0%BE%D0%BA%D0%B0%D1%80%D1%87%D1%83%D0%BA&image_size=medium'],7:['https://books.vremya.ru/uploads/posts/2025-06/filipenko_slon_cover_site.jpg'],8:['https://bookcover.longitood.com/bookcover?book_title=%D0%94%D0%B8%D1%82%D1%8F%20%D1%81%D0%BB%D0%BE%D0%B2%D0%B0&author_name=%D0%90%D0%B9%D1%80%D0%B8%D1%81%20%D0%9C%D1%91%D1%80%D0%B4%D0%BE%D0%BA&image_size=medium'],9:['https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1675081683i/90665550.jpg'],10:['https://bookcover.longitood.com/bookcover?book_title=19%20%D0%BC%D0%B8%D0%BD%D1%83%D1%82&author_name=%D0%94%D0%B6%D0%BE%D0%B4%D0%B8%20%D0%9F%D0%B8%D0%BA%D0%BE%D0%BB%D1%82&image_size=medium'],11:['https://bookcover.longitood.com/bookcover?book_title=%D0%A2%D0%B0%D0%B1%D0%B8%D1%8F%2032&author_name=%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9%20%D0%9A%D0%BE%D0%BD%D0%B0%D0%BA%D0%BE%D0%B2&image_size=medium']
  }
};

const outRoot = path.join(process.cwd(),'public','images','covers');
const manifest = {};
const extFor = (ct='') => ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : ct.includes('gif') ? 'gif' : 'jpg';

async function fetchBinary(url){
  let r = await fetch(url,{redirect:'follow',headers:{'user-agent':'Mozilla/5.0 DissLitClub/1.0','accept':'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'}});
  if(!r.ok) throw new Error(`${r.status} ${url}`);
  const ct=(r.headers.get('content-type')||'').toLowerCase();
  if(ct.includes('application/json')){
    const data=await r.json();
    const nested=data.url || data.image || data.cover;
    if(!nested) throw new Error(`JSON had no image URL: ${url}`);
    r=await fetch(nested,{redirect:'follow',headers:{'user-agent':'Mozilla/5.0 DissLitClub/1.0','accept':'image/*,*/*;q=0.8'}});
    if(!r.ok) throw new Error(`${r.status} ${nested}`);
  }
  const finalCt=(r.headers.get('content-type')||'').toLowerCase();
  if(!finalCt.startsWith('image/')) throw new Error(`not image: ${finalCt} ${url}`);
  const ab=await r.arrayBuffer();
  if(ab.byteLength<1000) throw new Error(`image too small: ${url}`);
  return {buf:Buffer.from(ab),ct:finalCt};
}

await fs.mkdir(outRoot,{recursive:true});
for(const [seasonId, entries] of Object.entries(covers)){
  manifest[seasonId]={};
  const dir=path.join(outRoot,`season-${String(seasonId).padStart(2,'0')}`);
  await fs.mkdir(dir,{recursive:true});
  for(const [meetingNo, urls] of Object.entries(entries)){
    const paths=[];
    for(let i=0;i<urls.length;i++){
      try{
        const {buf,ct}=await fetchBinary(urls[i]);
        const ext=extFor(ct);
        const file=`${String(meetingNo).padStart(2,'0')}${urls.length>1?`-${i+1}`:''}.${ext}`;
        await fs.writeFile(path.join(dir,file),buf);
        paths.push(`/images/covers/season-${String(seasonId).padStart(2,'0')}/${file}`);
        console.log(`cover ok s${seasonId} m${meetingNo}${urls.length>1?` #${i+1}`:''}`);
      }catch(e){
        console.warn(`cover failed s${seasonId} m${meetingNo}: ${e.message}`);
      }
    }
    if(paths.length) manifest[seasonId][meetingNo]=paths;
  }
}
const js=`// Generated at build time. Do not edit manually.\nexport default ${JSON.stringify(manifest,null,2)};\n`;
await fs.writeFile(path.join(process.cwd(),'src','data','cover-manifest.js'),js);
console.log('cover manifest generated');
