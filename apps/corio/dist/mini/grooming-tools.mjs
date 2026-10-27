export const GROOM_TOOL_LABELS={wipe:'Салфетка',brush:'Щётка',water:'Намочить',soap:'Шампунь',rinse:'Смыть',towel:'Полотенце',pause:'Передышка'};
const paths={
 wipe:'<path d="M7 10l29-3 5 29-29 5Z" fill="#f4ead4"/><path d="m12 15 20-2 3 19-19 3Z" fill="none" stroke="#9cafa0"/><path d="m31 35 5-9 5 10Z" fill="#c9c5ac"/>',
 brush:'<path d="m25 26 14 12q3 4-1 6t-6-1L21 29" fill="#d99852"/><path d="M7 8q11-8 22 3l3 12q-10 10-23 1Z" fill="#9cafa0"/><path d="m11 9 1 9m5-10 1 10m5-8 1 9m5-5 1 7"/>',
 water:'<path d="M6 10h21l-2 24H9Z" fill="#9cafa0"/><path d="M27 13q18-2 9 15H26" fill="none"/><path d="m8 19 18-1" stroke="#568fae"/><path d="M36 31q-6 9 0 10 6-1 0-10Z" fill="#568fae"/>',
 soap:'<path d="M18 5h13v6H18Z" fill="#d99852"/><path d="M13 15q12-6 23 0v27H13Z" fill="#9cafa0"/><path d="M17 23h15v12H17Z" fill="#f4ead4"/><path d="M23 30q3-5 5 0Z" fill="#173744"/><circle cx="20" cy="26" r="1"/><circle cx="25" cy="24" r="1"/><circle cx="29" cy="26" r="1"/>',
 rinse:'<path d="M6 9h20l1 6 10 3-6 9-6-3-2 13H9Z" fill="#f4ead4"/><path d="M24 10q14-4 14 7" fill="none"/><path d="M35 30q-5 8 0 9 5-1 0-9Zm7 5q-4 6 0 7 4-1 0-7Z" fill="#568fae"/>',
 towel:'<path d="M6 13h35v28H6Z" fill="#f4ead4"/><path d="M6 13q6-7 15-3h17l3 3" fill="#e0d2b6"/><path d="M11 17v20m3-20v20M8 22h31" stroke="#9cafa0"/>',pause:''};
export function groomToolIcon(tool){return paths[tool]?`<svg class="care-tool-icon" viewBox="0 0 48 48" aria-hidden="true"><g stroke="#173744" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">${paths[tool]}</g></svg>`:'';}
