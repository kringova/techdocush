// Native SVG silhouettes: one flat shape, no baked text or borrowed icon font.
const shapes={
 yarn:'<circle cx="48" cy="49" r="30"/><path d="M60 71Q72 91 91 76L93 82Q70 100 55 76Z"/>',
 ball:'<circle cx="50" cy="50" r="34"/>',
 brush:'<path d="M12 28Q3 50 12 65Q27 77 52 64L86 66Q100 66 96 54L56 49Q61 20 35 20Q20 20 12 28Z"/>',
 key:'<path fill-rule="evenodd" d="M70 18a25 25 0 1 1-9 48L17 78l-4-13 12-4-2-9 13-4 3 9 18-5A25 25 0 0 1 70 18Zm4 12a13 13 0 1 0 0 26 13 13 0 0 0 0-26Z"/>',
 cup:'<path fill-rule="evenodd" d="M12 21h54v8h13a19 19 0 0 1 0 38H66q-2 16-24 16T12 67Zm54 18v18h11a9 9 0 0 0 0-18Z"/>',
 sock:'<path d="M41 10h31v43l-2 9-32 24Q14 96 9 80q-3-9 9-17l24-17Z"/>',
 glasses:'<path fill-rule="evenodd" d="M8 39a20 20 0 1 1 36 16q6-5 12 0a20 20 0 1 1 36-16l7-6 1 8-5 6q-3 31-29 23-9-3-14-13h-4Q37 78 17 68 2 62 5 47L0 42l1-9Zm17-1a13 13 0 1 0 0 26 13 13 0 0 0 0-26Zm50 0a13 13 0 1 0 0 26 13 13 0 0 0 0-26Z"/>',
 bell:'<path d="M43 14q7-9 14 0v9q17 5 17 25l4 13 10 11H12l10-11 4-13q0-20 17-25Zm-5 64h24q-2 14-12 14T38 78Z"/>',
 ribbon:'<path d="M45 42Q8 1 6 40q-3 24 35 15L22 89l24-8 6-23 13 26 22 4-27-34q40 8 34-20Q87 1 55 42Z"/>',
 book:'<path d="M12 18h71l6 7v61H18q-9-2-9-10V27q0-6 3-9Zm9 53v7h59v-7ZM58 20v34l9-8 9 8V20Z" fill-rule="evenodd"/>',
 bowl:'<path d="M5 39Q50 23 95 39L85 77Q50 90 15 77ZM7 30Q50 15 93 30L95 39Q50 49 5 39Z"/>',
 spoon:'<path d="M14 15Q3 23 10 37q6 12 17 14l46 38q8 6 14-1t-2-14L42 39q1-13-10-20t-18-4Z"/>',
 towel:'<path d="M25 8h51l-3 66 7 14-13-3-8 5-10-5-9 5-10-5-10 3 5-18Z"/>',
 apple:'<path d="M51 27Q16 7 12 49q-3 31 24 40l15-4 13 4q28-10 25-39-4-42-34-24l-4-17-9 3Z"/><path d="M53 20Q55 0 81 6 77 23 53 20Z"/>',
 mitt:'<path d="M28 85V54L14 45Q1 35 12 25q6-5 17 3V17Q29 2 47 4L66 7q13 5 12 21v57Z"/>',
 fish:'<path d="M7 20l23 18q17-26 41-17l22 21q7 8 0 14L71 77Q46 89 30 61L7 80l7-30Z"/>',
 whisk:'<path fill-rule="evenodd" d="M42 60Q1 14 29 8q12-3 21 14 9-17 21-14 28 6-13 52L58 91H42Zm7-5Q24 16 29 16q9-5 17 21Zm2 0q24-39 20-39-10-5-17 21Zm-7-3Q6 21 22 16q1 13 22 36Zm12 0q38-31 22-36-1 13-22 36Z"/>',
 sponge:'<path d="M8 29l65-9 20 14-4 42-67 5L7 67Z"/>',
 watering:'<path fill-rule="evenodd" d="M17 35q-9-28 12-32 22-2 24 30h15v16l22-22 9 5-25 45-8 9H14L9 39Zm9-3h18Q42 12 31 13q-12 2-5 19Z"/>',
 pinecone:'<path d="M46 5l12 9 13-1 3 14 14 6-5 15 9 12-11 10-1 14-17 1-10 12-14-11-15-1 1-14-13-9 7-13-5-13 14-9 1-14 13 1Z"/>',
 feather:'<path d="M12 86Q22 24 82 8q8 44-47 67l-9-1-10 17Zm16-20Q54 38 74 22L24 79Z"/>',
 flowerpot:'<path d="M29 64h44l-6 30H35Zm-5-9h54v12H24ZM48 60V29h5v31Z"/><path d="M49 42Q14 44 17 23q26-4 33 15ZM52 37q35 2 32-19-25-4-32 15ZM46 23Q32 14 41 4q15-5 17 11 10-13 20-1 2 16-17 15Z"/>',
 shovel:'<path d="M38 3h25v25H53v25q25 15 13 33L50 99 33 86Q20 69 43 53V28h-5Zm7 7v11h11V10Z" fill-rule="evenodd"/>',
 leaf:'<path d="M6 45L35 30 35 13l15 13L68 4l1 29 27 4-19 16 15 19-28 1-5 21-17-21-22 12 7-23Z"/>',
 glove:'<path d="M28 87V58L9 39Q0 28 9 23q5-3 20 13L25 10Q25 0 34 2l9 28V6q3-10 10-3l3 27 7-22q6-8 12 0l-5 27 11-16q9-7 13 2L78 65v22Z"/>',
 lantern:'<path fill-rule="evenodd" d="M35 21V12Q50-8 65 12v9l15 12-8 10 6 42 9 8H13l9-8 6-42-8-10Zm9 0h12v-7q-6-9-12 0Zm-9 23-5 36h40l-5-36Z"/>'
};
export function searchSilhouette(id){
  if(!shapes[id])throw new Error('Missing silhouette: '+id);
  return`<svg viewBox="0 0 100 100" class="search-silhouette" aria-hidden="true" focusable="false">${shapes[id]}</svg>`;
}
