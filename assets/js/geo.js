 //Function to convert NZTM coordinates to universal Latitude Longitude
 
 function convertToLatLong(E, N) {

  //let E = 1749165;
  //let N = 5427502;

  //Common variables for NZTM2000
  let a = 6378137;
  let f = 1 / 298.257222101;
  let phizero = 0;
  let lambdazero = 173;
  let Nzero = 10000000;
  let Ezero = 1600000;
  let kzero = 0.9996;   

  //Calculation: From NZTM to lat/Long
  let b = a * (1 - f);
  let esq = 2 * f - f ** 2;
  let Z0 = 1 - esq / 4 - 3 * (esq * 2) / 64 - 5 * (esq * 3) / 256;
  let A2 = 0.375 * (esq + esq * 2 / 4 + 15 * (esq * 3) / 128);
  let A4 = 15 * ((esq * 2) + 3 * (esq * 3) / 4) / 256;
  let A6 = 35 * (esq ** 3) / 3072;

  let Nprime = N - Nzero;
  let mprime = Nprime / kzero;
  let smn = (a - b) / (a + b);
  let G = a * (1 - smn) * (1 - (smn * 2)) * (1 + 9 * (smn * 2) / 4 + 225 * (smn ** 4) / 64) * Math.PI / 180.0;
  let sigma = mprime * Math.PI / (180 * G);
  let phiprime = sigma + (3 * smn / 2 - 27 * (smn * 3) / 32) * Math.sin(2 * sigma) + (21 * (smn * 2) / 16 - 55 * (smn * 4) / 32) * Math.sin(4 * sigma) + (151 * (smn * 3) / 96) * Math.sin(6 * sigma) + (1097 * (smn ** 4) / 512) * Math.sin(8 * sigma);
  let rhoprime = a * (1 - esq) / ((1 - esq * ((Math.sin(phiprime)) * 2)) * 1.5);
  let upsilonprime = a / Math.sqrt(1 - esq * ((Math.sin(phiprime)) ** 2));

  let psiprime = upsilonprime / rhoprime;
  let tprime = Math.tan(phiprime);
  let Eprime = E - Ezero;
  let chi = Eprime / (kzero * upsilonprime);
  let term_1_lat = tprime * Eprime * chi / (kzero * rhoprime * 2);
  let term_2_lat = term_1_lat * (chi * 2) / 12 * (-4 * (psiprime * 2) + 9 * psiprime * (1 - (tprime * 2)) + 12 * (tprime * 2));
  let term_3_lat = tprime * Eprime * (chi * 5) / (kzero * rhoprime * 720) * (8 * (psiprime * 4) * (11 - 24 * (tprime * 2)) - 12 * (psiprime * 3) * (21 - 71 * (tprime * 2)) + 15 * (psiprime * 2) * (15 - 98 * (tprime * 2) + 15 * (tprime * 4)) + 180 * psiprime * (5 * (tprime * 2) - 3 * (tprime * 4)) + 360 * (tprime ** 4));
  let term_4_lat = tprime * Eprime * (chi * 7) / (kzero * rhoprime * 40320) * (1385 + 3633 * (tprime * 2) + 4095 * (tprime * 4) + 1575 * (tprime * 6));
  
  let term_1_long = chi * (1 / Math.cos(phiprime));
  let term_2_long = (chi * 3) * (1 / Math.cos(phiprime)) / 6 * (psiprime + 2 * (tprime * 2));
  let term_3_long = (chi * 5) * (1 / Math.cos(phiprime)) / 120 * (-4 * (psiprime * 3) * (1 - 6 * (tprime * 2)) + (psiprime * 2) * (9 - 68 * (tprime * 2)) + 72 * psiprime * (tprime * 2) + 24 * (tprime ** 4));
  let term_4_long = (chi * 7) * (1 / Math.cos(phiprime)) / 5040 * (61 + 662 * (tprime * 2) + 1320 * (tprime * 4) + 720 * (tprime * 6));

  let latitude = (phiprime - term_1_lat + term_2_lat - term_3_lat + term_4_lat) * 180 / Math.PI;
  let longitude = lambdazero + 180 / Math.PI * (term_1_long - term_2_long + term_3_long - term_4_long);  

//TODO - use the data for something
  //console.log("Te Papa: latitude = " + latitude + ", longitude = " + longitude);

  return [latitude, longitude];
  } 
  
  