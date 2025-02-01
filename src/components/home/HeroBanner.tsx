import { useViewport } from "hooks";
import React from "react";
import styled from "styled-components";

const StyledHeroSection = styled.section`
  width: 100%;
  height: clamp(250px, 50vw, 450px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
`;

export const HeroBanner = () => {
  return (
    <StyledHeroSection>
      <BannerText />
    </StyledHeroSection>
  );
};

const StyledBannerTextSVG = styled.svg`
  width: 100%;
  height: auto;
`;

const BannerText = () => {
  const { isMobile } = useViewport(720);
  return (
    <>
      {!isMobile ? (
        <StyledBannerTextSVG
          width={1427}
          height={401}
          viewBox="0 0 1427 401"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M394.592 219.872L364.58 335H330.632L312.264 259.232L293.24 335H259.292L230.1 219.872H260.112L276.676 303.676L297.176 219.872H328.008L347.688 303.676L364.416 219.872H394.592ZM488.36 287.768C488.36 290.392 488.196 293.125 487.868 295.968H424.4C424.838 301.653 426.642 306.027 429.812 309.088C433.092 312.04 437.083 313.516 441.784 313.516C448.782 313.516 453.647 310.564 456.38 304.66H486.228C484.698 310.673 481.91 316.085 477.864 320.896C473.928 325.707 468.954 329.479 462.94 332.212C456.927 334.945 450.203 336.312 442.768 336.312C433.803 336.312 425.822 334.399 418.824 330.572C411.827 326.745 406.36 321.279 402.424 314.172C398.488 307.065 396.52 298.756 396.52 289.244C396.52 279.732 398.434 271.423 402.26 264.316C406.196 257.209 411.663 251.743 418.66 247.916C425.658 244.089 433.694 242.176 442.768 242.176C451.624 242.176 459.496 244.035 466.384 247.752C473.272 251.469 478.63 256.772 482.456 263.66C486.392 270.548 488.36 278.584 488.36 287.768ZM459.66 280.388C459.66 275.577 458.02 271.751 454.74 268.908C451.46 266.065 447.36 264.644 442.44 264.644C437.739 264.644 433.748 266.011 430.468 268.744C427.298 271.477 425.33 275.359 424.564 280.388H459.66ZM524.639 256.444C527.263 252.18 531.035 248.736 535.955 246.112C540.875 243.488 546.506 242.176 552.847 242.176C560.391 242.176 567.224 244.089 573.347 247.916C579.47 251.743 584.28 257.209 587.779 264.316C591.387 271.423 593.191 279.677 593.191 289.08C593.191 298.483 591.387 306.792 587.779 314.008C584.28 321.115 579.47 326.636 573.347 330.572C567.224 334.399 560.391 336.312 552.847 336.312C546.396 336.312 540.766 335.055 535.955 332.54C531.144 329.916 527.372 326.472 524.639 322.208V335H496.595V213.64H524.639V256.444ZM564.655 289.08C564.655 282.083 562.687 276.616 558.751 272.68C554.924 268.635 550.168 266.612 544.483 266.612C538.907 266.612 534.151 268.635 530.215 272.68C526.388 276.725 524.475 282.247 524.475 289.244C524.475 296.241 526.388 301.763 530.215 305.808C534.151 309.853 538.907 311.876 544.483 311.876C550.059 311.876 554.815 309.853 558.751 305.808C562.687 301.653 564.655 296.077 564.655 289.08ZM672.669 219.872C684.805 219.872 695.411 222.277 704.485 227.088C713.56 231.899 720.557 238.677 725.477 247.424C730.507 256.061 733.021 266.065 733.021 277.436C733.021 288.697 730.507 298.701 725.477 307.448C720.557 316.195 713.505 322.973 704.321 327.784C695.247 332.595 684.696 335 672.669 335H629.537V219.872H672.669ZM670.865 310.728C681.471 310.728 689.725 307.831 695.629 302.036C701.533 296.241 704.485 288.041 704.485 277.436C704.485 266.831 701.533 258.576 695.629 252.672C689.725 246.768 681.471 243.816 670.865 243.816H657.581V310.728H670.865ZM828.398 287.768C828.398 290.392 828.234 293.125 827.906 295.968H764.438C764.875 301.653 766.679 306.027 769.85 309.088C773.13 312.04 777.12 313.516 781.822 313.516C788.819 313.516 793.684 310.564 796.418 304.66H826.266C824.735 310.673 821.947 316.085 817.902 320.896C813.966 325.707 808.991 329.479 802.978 332.212C796.964 334.945 790.24 336.312 782.806 336.312C773.84 336.312 765.859 334.399 758.862 330.572C751.864 326.745 746.398 321.279 742.462 314.172C738.526 307.065 736.558 298.756 736.558 289.244C736.558 279.732 738.471 271.423 742.298 264.316C746.234 257.209 751.7 251.743 758.698 247.916C765.695 244.089 773.731 242.176 782.806 242.176C791.662 242.176 799.534 244.035 806.422 247.752C813.31 251.469 818.667 256.772 822.494 263.66C826.43 270.548 828.398 278.584 828.398 287.768ZM799.698 280.388C799.698 275.577 798.058 271.751 794.778 268.908C791.498 266.065 787.398 264.644 782.478 264.644C777.776 264.644 773.786 266.011 770.506 268.744C767.335 271.477 765.367 275.359 764.602 280.388H799.698ZM877.796 308.76L897.64 243.488H927.488L895.016 335H860.412L827.94 243.488H857.952L877.796 308.76ZM1019 287.768C1019 290.392 1018.83 293.125 1018.5 295.968H955.036C955.474 301.653 957.278 306.027 960.448 309.088C963.728 312.04 967.719 313.516 972.42 313.516C979.418 313.516 984.283 310.564 987.016 304.66H1016.86C1015.33 310.673 1012.55 316.085 1008.5 320.896C1004.56 325.707 999.59 329.479 993.576 332.212C987.563 334.945 980.839 336.312 973.404 336.312C964.439 336.312 956.458 334.399 949.46 330.572C942.463 326.745 936.996 321.279 933.06 314.172C929.124 307.065 927.156 298.756 927.156 289.244C927.156 279.732 929.07 271.423 932.896 264.316C936.832 257.209 942.299 251.743 949.296 247.916C956.294 244.089 964.33 242.176 973.404 242.176C982.26 242.176 990.132 244.035 997.02 247.752C1003.91 251.469 1009.27 256.772 1013.09 263.66C1017.03 270.548 1019 278.584 1019 287.768ZM990.296 280.388C990.296 275.577 988.656 271.751 985.376 268.908C982.096 266.065 977.996 264.644 973.076 264.644C968.375 264.644 964.384 266.011 961.104 268.744C957.934 271.477 955.966 275.359 955.2 280.388H990.296ZM1055.27 213.64V335H1027.23V213.64H1055.27ZM1110.69 336.312C1101.73 336.312 1093.64 334.399 1086.42 330.572C1079.32 326.745 1073.68 321.279 1069.53 314.172C1065.48 307.065 1063.46 298.756 1063.46 289.244C1063.46 279.841 1065.54 271.587 1069.69 264.48C1073.85 257.264 1079.53 251.743 1086.75 247.916C1093.97 244.089 1102.06 242.176 1111.02 242.176C1119.99 242.176 1128.08 244.089 1135.29 247.916C1142.51 251.743 1148.2 257.264 1152.35 264.48C1156.5 271.587 1158.58 279.841 1158.58 289.244C1158.58 298.647 1156.45 306.956 1152.19 314.172C1148.03 321.279 1142.29 326.745 1134.97 330.572C1127.75 334.399 1119.66 336.312 1110.69 336.312ZM1110.69 312.04C1116.05 312.04 1120.59 310.072 1124.31 306.136C1128.13 302.2 1130.05 296.569 1130.05 289.244C1130.05 281.919 1128.19 276.288 1124.47 272.352C1120.86 268.416 1116.38 266.448 1111.02 266.448C1105.56 266.448 1101.02 268.416 1097.41 272.352C1093.8 276.179 1092 281.809 1092 289.244C1092 296.569 1093.75 302.2 1097.25 306.136C1100.85 310.072 1105.34 312.04 1110.69 312.04ZM1194.94 256.444C1197.68 252.18 1201.45 248.736 1206.26 246.112C1211.07 243.488 1216.7 242.176 1223.15 242.176C1230.7 242.176 1237.53 244.089 1243.65 247.916C1249.77 251.743 1254.59 257.209 1258.08 264.316C1261.69 271.423 1263.5 279.677 1263.5 289.08C1263.5 298.483 1261.69 306.792 1258.08 314.008C1254.59 321.115 1249.77 326.636 1243.65 330.572C1237.53 334.399 1230.7 336.312 1223.15 336.312C1216.81 336.312 1211.18 335 1206.26 332.376C1201.45 329.752 1197.68 326.363 1194.94 322.208V378.624H1166.9V243.488H1194.94V256.444ZM1234.96 289.08C1234.96 282.083 1232.99 276.616 1229.06 272.68C1225.23 268.635 1220.47 266.612 1214.79 266.612C1209.21 266.612 1204.46 268.635 1200.52 272.68C1196.69 276.725 1194.78 282.247 1194.78 289.244C1194.78 296.241 1196.69 301.763 1200.52 305.808C1204.46 309.853 1209.21 311.876 1214.79 311.876C1220.36 311.876 1225.12 309.853 1229.06 305.808C1232.99 301.653 1234.96 296.077 1234.96 289.08ZM1357.91 287.768C1357.91 290.392 1357.75 293.125 1357.42 295.968H1293.95C1294.39 301.653 1296.19 306.027 1299.36 309.088C1302.64 312.04 1306.64 313.516 1311.34 313.516C1318.33 313.516 1323.2 310.564 1325.93 304.66H1355.78C1354.25 310.673 1351.46 316.085 1347.42 320.896C1343.48 325.707 1338.51 329.479 1332.49 332.212C1326.48 334.945 1319.76 336.312 1312.32 336.312C1303.36 336.312 1295.37 334.399 1288.38 330.572C1281.38 326.745 1275.91 321.279 1271.98 314.172C1268.04 307.065 1266.07 298.756 1266.07 289.244C1266.07 279.732 1267.99 271.423 1271.81 264.316C1275.75 257.209 1281.22 251.743 1288.21 247.916C1295.21 244.089 1303.25 242.176 1312.32 242.176C1321.18 242.176 1329.05 244.035 1335.94 247.752C1342.82 251.469 1348.18 256.772 1352.01 263.66C1355.94 270.548 1357.91 278.584 1357.91 287.768ZM1329.21 280.388C1329.21 275.577 1327.57 271.751 1324.29 268.908C1321.01 266.065 1316.91 264.644 1311.99 264.644C1307.29 264.644 1303.3 266.011 1300.02 268.744C1296.85 271.477 1294.88 275.359 1294.12 280.388H1329.21ZM1394.19 258.74C1397.47 253.711 1401.57 249.775 1406.49 246.932C1411.41 243.98 1416.88 242.504 1422.89 242.504V272.188H1415.18C1408.19 272.188 1402.94 273.719 1399.44 276.78C1395.94 279.732 1394.19 284.98 1394.19 292.524V335H1366.15V243.488H1394.19V258.74Z"
            fill="#181818"
          />
          <path
            d="M5.412 122.272C5.412 110.901 7.872 100.788 12.792 91.932C17.712 82.9667 24.5453 76.024 33.292 71.104C42.148 66.0747 52.152 63.56 63.304 63.56C76.9707 63.56 88.6693 67.168 98.4 74.384C108.131 81.6 114.636 91.44 117.916 103.904H87.084C84.788 99.0933 81.508 95.4307 77.244 92.916C73.0893 90.4013 68.3333 89.144 62.976 89.144C54.3387 89.144 47.3413 92.1507 41.984 98.164C36.6267 104.177 33.948 112.213 33.948 122.272C33.948 132.331 36.6267 140.367 41.984 146.38C47.3413 152.393 54.3387 155.4 62.976 155.4C68.3333 155.4 73.0893 154.143 77.244 151.628C81.508 149.113 84.788 145.451 87.084 140.64H117.916C114.636 153.104 108.131 162.944 98.4 170.16C88.6693 177.267 76.9707 180.82 63.304 180.82C52.152 180.82 42.148 178.36 33.292 173.44C24.5453 168.411 17.712 161.468 12.792 152.612C7.872 143.756 5.412 133.643 5.412 122.272ZM156.574 103.74C159.854 98.7107 163.954 94.7747 168.874 91.932C173.794 88.98 179.261 87.504 185.274 87.504V117.188H177.566C170.569 117.188 165.321 118.719 161.822 121.78C158.323 124.732 156.574 129.98 156.574 137.524V180H128.53V88.488H156.574V103.74ZM278.382 132.768C278.382 135.392 278.218 138.125 277.89 140.968H214.422C214.86 146.653 216.664 151.027 219.834 154.088C223.114 157.04 227.105 158.516 231.806 158.516C238.804 158.516 243.669 155.564 246.402 149.66H276.25C274.72 155.673 271.932 161.085 267.886 165.896C263.95 170.707 258.976 174.479 252.962 177.212C246.949 179.945 240.225 181.312 232.79 181.312C223.825 181.312 215.844 179.399 208.846 175.572C201.849 171.745 196.382 166.279 192.446 159.172C188.51 152.065 186.542 143.756 186.542 134.244C186.542 124.732 188.456 116.423 192.282 109.316C196.218 102.209 201.685 96.7427 208.682 92.916C215.68 89.0893 223.716 87.176 232.79 87.176C241.646 87.176 249.518 89.0347 256.406 92.752C263.294 96.4693 268.652 101.772 272.478 108.66C276.414 115.548 278.382 123.584 278.382 132.768ZM249.682 125.388C249.682 120.577 248.042 116.751 244.762 113.908C241.482 111.065 237.382 109.644 232.462 109.644C227.761 109.644 223.77 111.011 220.49 113.744C217.32 116.477 215.352 120.359 214.586 125.388H249.682ZM281.041 134.08C281.041 124.677 282.79 116.423 286.289 109.316C289.897 102.209 294.762 96.7427 300.885 92.916C307.008 89.0893 313.841 87.176 321.385 87.176C327.836 87.176 333.466 88.488 338.277 91.112C343.197 93.736 346.969 97.18 349.593 101.444V88.488H377.637V180H349.593V167.044C346.86 171.308 343.033 174.752 338.113 177.376C333.302 180 327.672 181.312 321.221 181.312C313.786 181.312 307.008 179.399 300.885 175.572C294.762 171.636 289.897 166.115 286.289 159.008C282.79 151.792 281.041 143.483 281.041 134.08ZM349.593 134.244C349.593 127.247 347.625 121.725 343.689 117.68C339.862 113.635 335.161 111.612 329.585 111.612C324.009 111.612 319.253 113.635 315.317 117.68C311.49 121.616 309.577 127.083 309.577 134.08C309.577 141.077 311.49 146.653 315.317 150.808C319.253 154.853 324.009 156.876 329.585 156.876C335.161 156.876 339.862 154.853 343.689 150.808C347.625 146.763 349.593 141.241 349.593 134.244ZM442.37 156.22V180H428.102C417.934 180 410.007 177.54 404.322 172.62C398.636 167.591 395.794 159.445 395.794 148.184V111.776H384.642V88.488H395.794V66.184H423.838V88.488H442.206V111.776H423.838V148.512C423.838 151.245 424.494 153.213 425.806 154.416C427.118 155.619 429.304 156.22 432.366 156.22H442.37ZM465.535 78.976C460.615 78.976 456.569 77.5547 453.399 74.712C450.337 71.76 448.807 68.152 448.807 63.888C448.807 59.5147 450.337 55.9067 453.399 53.064C456.569 50.112 460.615 48.636 465.535 48.636C470.345 48.636 474.281 50.112 477.343 53.064C480.513 55.9067 482.099 59.5147 482.099 63.888C482.099 68.152 480.513 71.76 477.343 74.712C474.281 77.5547 470.345 78.976 465.535 78.976ZM479.475 88.488V180H451.431V88.488H479.475ZM534.402 153.76L554.246 88.488H584.094L551.622 180H517.018L484.546 88.488H514.558L534.402 153.76ZM675.602 132.768C675.602 135.392 675.438 138.125 675.11 140.968H611.642C612.079 146.653 613.883 151.027 617.054 154.088C620.334 157.04 624.325 158.516 629.026 158.516C636.023 158.516 640.889 155.564 643.622 149.66H673.47C671.939 155.673 669.151 161.085 665.106 165.896C661.17 170.707 656.195 174.479 650.182 177.212C644.169 179.945 637.445 181.312 630.01 181.312C621.045 181.312 613.063 179.399 606.066 175.572C599.069 171.745 593.602 166.279 589.666 159.172C585.73 152.065 583.762 143.756 583.762 134.244C583.762 124.732 585.675 116.423 589.502 109.316C593.438 102.209 598.905 96.7427 605.902 92.916C612.899 89.0893 620.935 87.176 630.01 87.176C638.866 87.176 646.738 89.0347 653.626 92.752C660.514 96.4693 665.871 101.772 669.698 108.66C673.634 115.548 675.602 123.584 675.602 132.768ZM646.902 125.388C646.902 120.577 645.262 116.751 641.982 113.908C638.702 111.065 634.602 109.644 629.682 109.644C624.981 109.644 620.99 111.011 617.71 113.744C614.539 116.477 612.571 120.359 611.806 125.388H646.902Z"
            fill="#181818"
          />
        </StyledBannerTextSVG>
      ) : (
        <svg
          width="1282"
          height="417"
          viewBox="0 0 1282 417"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M249.592 235.872L219.58 351H185.632L167.264 275.232L148.24 351H114.292L85.1 235.872H115.112L131.676 319.676L152.176 235.872H183.008L202.688 319.676L219.416 235.872H249.592ZM343.36 303.768C343.36 306.392 343.196 309.125 342.868 311.968H279.4C279.838 317.653 281.642 322.027 284.812 325.088C288.092 328.04 292.083 329.516 296.784 329.516C303.782 329.516 308.647 326.564 311.38 320.66H341.228C339.698 326.673 336.91 332.085 332.864 336.896C328.928 341.707 323.954 345.479 317.94 348.212C311.927 350.945 305.203 352.312 297.768 352.312C288.803 352.312 280.822 350.399 273.824 346.572C266.827 342.745 261.36 337.279 257.424 330.172C253.488 323.065 251.52 314.756 251.52 305.244C251.52 295.732 253.434 287.423 257.26 280.316C261.196 273.209 266.663 267.743 273.66 263.916C280.658 260.089 288.694 258.176 297.768 258.176C306.624 258.176 314.496 260.035 321.384 263.752C328.272 267.469 333.63 272.772 337.456 279.66C341.392 286.548 343.36 294.584 343.36 303.768ZM314.66 296.388C314.66 291.577 313.02 287.751 309.74 284.908C306.46 282.065 302.36 280.644 297.44 280.644C292.739 280.644 288.748 282.011 285.468 284.744C282.298 287.477 280.33 291.359 279.564 296.388H314.66ZM379.639 272.444C382.263 268.18 386.035 264.736 390.955 262.112C395.875 259.488 401.506 258.176 407.847 258.176C415.391 258.176 422.224 260.089 428.347 263.916C434.47 267.743 439.28 273.209 442.779 280.316C446.387 287.423 448.191 295.677 448.191 305.08C448.191 314.483 446.387 322.792 442.779 330.008C439.28 337.115 434.47 342.636 428.347 346.572C422.224 350.399 415.391 352.312 407.847 352.312C401.396 352.312 395.766 351.055 390.955 348.54C386.144 345.916 382.372 342.472 379.639 338.208V351H351.595V229.64H379.639V272.444ZM419.655 305.08C419.655 298.083 417.687 292.616 413.751 288.68C409.924 284.635 405.168 282.612 399.483 282.612C393.907 282.612 389.151 284.635 385.215 288.68C381.388 292.725 379.475 298.247 379.475 305.244C379.475 312.241 381.388 317.763 385.215 321.808C389.151 325.853 393.907 327.876 399.483 327.876C405.059 327.876 409.815 325.853 413.751 321.808C417.687 317.653 419.655 312.077 419.655 305.08ZM527.669 235.872C539.805 235.872 550.411 238.277 559.485 243.088C568.56 247.899 575.557 254.677 580.477 263.424C585.507 272.061 588.021 282.065 588.021 293.436C588.021 304.697 585.507 314.701 580.477 323.448C575.557 332.195 568.505 338.973 559.321 343.784C550.247 348.595 539.696 351 527.669 351H484.537V235.872H527.669ZM525.865 326.728C536.471 326.728 544.725 323.831 550.629 318.036C556.533 312.241 559.485 304.041 559.485 293.436C559.485 282.831 556.533 274.576 550.629 268.672C544.725 262.768 536.471 259.816 525.865 259.816H512.581V326.728H525.865ZM683.398 303.768C683.398 306.392 683.234 309.125 682.906 311.968H619.438C619.875 317.653 621.679 322.027 624.85 325.088C628.13 328.04 632.12 329.516 636.822 329.516C643.819 329.516 648.684 326.564 651.418 320.66H681.266C679.735 326.673 676.947 332.085 672.902 336.896C668.966 341.707 663.991 345.479 657.978 348.212C651.964 350.945 645.24 352.312 637.806 352.312C628.84 352.312 620.859 350.399 613.862 346.572C606.864 342.745 601.398 337.279 597.462 330.172C593.526 323.065 591.558 314.756 591.558 305.244C591.558 295.732 593.471 287.423 597.298 280.316C601.234 273.209 606.7 267.743 613.698 263.916C620.695 260.089 628.731 258.176 637.806 258.176C646.662 258.176 654.534 260.035 661.422 263.752C668.31 267.469 673.667 272.772 677.494 279.66C681.43 286.548 683.398 294.584 683.398 303.768ZM654.698 296.388C654.698 291.577 653.058 287.751 649.778 284.908C646.498 282.065 642.398 280.644 637.478 280.644C632.776 280.644 628.786 282.011 625.506 284.744C622.335 287.477 620.367 291.359 619.602 296.388H654.698ZM732.796 324.76L752.64 259.488H782.488L750.016 351H715.412L682.94 259.488H712.952L732.796 324.76ZM873.996 303.768C873.996 306.392 873.832 309.125 873.504 311.968H810.036C810.474 317.653 812.278 322.027 815.448 325.088C818.728 328.04 822.719 329.516 827.42 329.516C834.418 329.516 839.283 326.564 842.016 320.66H871.864C870.334 326.673 867.546 332.085 863.5 336.896C859.564 341.707 854.59 345.479 848.576 348.212C842.563 350.945 835.839 352.312 828.404 352.312C819.439 352.312 811.458 350.399 804.46 346.572C797.463 342.745 791.996 337.279 788.06 330.172C784.124 323.065 782.156 314.756 782.156 305.244C782.156 295.732 784.07 287.423 787.896 280.316C791.832 273.209 797.299 267.743 804.296 263.916C811.294 260.089 819.33 258.176 828.404 258.176C837.26 258.176 845.132 260.035 852.02 263.752C858.908 267.469 864.266 272.772 868.092 279.66C872.028 286.548 873.996 294.584 873.996 303.768ZM845.296 296.388C845.296 291.577 843.656 287.751 840.376 284.908C837.096 282.065 832.996 280.644 828.076 280.644C823.375 280.644 819.384 282.011 816.104 284.744C812.934 287.477 810.966 291.359 810.2 296.388H845.296ZM910.275 229.64V351H882.231V229.64H910.275ZM965.694 352.312C956.729 352.312 948.638 350.399 941.422 346.572C934.316 342.745 928.685 337.279 924.53 330.172C920.485 323.065 918.462 314.756 918.462 305.244C918.462 295.841 920.54 287.587 924.694 280.48C928.849 273.264 934.534 267.743 941.75 263.916C948.966 260.089 957.057 258.176 966.022 258.176C974.988 258.176 983.078 260.089 990.294 263.916C997.51 267.743 1003.2 273.264 1007.35 280.48C1011.5 287.587 1013.58 295.841 1013.58 305.244C1013.58 314.647 1011.45 322.956 1007.19 330.172C1003.03 337.279 997.292 342.745 989.966 346.572C982.75 350.399 974.66 352.312 965.694 352.312ZM965.694 328.04C971.052 328.04 975.589 326.072 979.306 322.136C983.133 318.2 985.046 312.569 985.046 305.244C985.046 297.919 983.188 292.288 979.47 288.352C975.862 284.416 971.38 282.448 966.022 282.448C960.556 282.448 956.018 284.416 952.41 288.352C948.802 292.179 946.998 297.809 946.998 305.244C946.998 312.569 948.748 318.2 952.246 322.136C955.854 326.072 960.337 328.04 965.694 328.04ZM1049.94 272.444C1052.68 268.18 1056.45 264.736 1061.26 262.112C1066.07 259.488 1071.7 258.176 1078.15 258.176C1085.7 258.176 1092.53 260.089 1098.65 263.916C1104.77 267.743 1109.59 273.209 1113.08 280.316C1116.69 287.423 1118.5 295.677 1118.5 305.08C1118.5 314.483 1116.69 322.792 1113.08 330.008C1109.59 337.115 1104.77 342.636 1098.65 346.572C1092.53 350.399 1085.7 352.312 1078.15 352.312C1071.81 352.312 1066.18 351 1061.26 348.376C1056.45 345.752 1052.68 342.363 1049.94 338.208V394.624H1021.9V259.488H1049.94V272.444ZM1089.96 305.08C1089.96 298.083 1087.99 292.616 1084.06 288.68C1080.23 284.635 1075.47 282.612 1069.79 282.612C1064.21 282.612 1059.46 284.635 1055.52 288.68C1051.69 292.725 1049.78 298.247 1049.78 305.244C1049.78 312.241 1051.69 317.763 1055.52 321.808C1059.46 325.853 1064.21 327.876 1069.79 327.876C1075.36 327.876 1080.12 325.853 1084.06 321.808C1087.99 317.653 1089.96 312.077 1089.96 305.08ZM1212.91 303.768C1212.91 306.392 1212.75 309.125 1212.42 311.968H1148.95C1149.39 317.653 1151.19 322.027 1154.36 325.088C1157.64 328.04 1161.64 329.516 1166.34 329.516C1173.33 329.516 1178.2 326.564 1180.93 320.66H1210.78C1209.25 326.673 1206.46 332.085 1202.42 336.896C1198.48 341.707 1193.51 345.479 1187.49 348.212C1181.48 350.945 1174.76 352.312 1167.32 352.312C1158.36 352.312 1150.37 350.399 1143.38 346.572C1136.38 342.745 1130.91 337.279 1126.98 330.172C1123.04 323.065 1121.07 314.756 1121.07 305.244C1121.07 295.732 1122.99 287.423 1126.81 280.316C1130.75 273.209 1136.22 267.743 1143.21 263.916C1150.21 260.089 1158.25 258.176 1167.32 258.176C1176.18 258.176 1184.05 260.035 1190.94 263.752C1197.82 267.469 1203.18 272.772 1207.01 279.66C1210.94 286.548 1212.91 294.584 1212.91 303.768ZM1184.21 296.388C1184.21 291.577 1182.57 287.751 1179.29 284.908C1176.01 282.065 1171.91 280.644 1166.99 280.644C1162.29 280.644 1158.3 282.011 1155.02 284.744C1151.85 287.477 1149.88 291.359 1149.12 296.388H1184.21ZM1249.19 274.74C1252.47 269.711 1256.57 265.775 1261.49 262.932C1266.41 259.98 1271.88 258.504 1277.89 258.504V288.188H1270.18C1263.19 288.188 1257.94 289.719 1254.44 292.78C1250.94 295.732 1249.19 300.98 1249.19 308.524V351H1221.15V259.488H1249.19V274.74Z"
            fill="#181818"
          />
          <path
            d="M5.412 122.272C5.412 110.901 7.872 100.788 12.792 91.932C17.712 82.9667 24.5453 76.024 33.292 71.104C42.148 66.0747 52.152 63.56 63.304 63.56C76.9707 63.56 88.6693 67.168 98.4 74.384C108.131 81.6 114.636 91.44 117.916 103.904H87.084C84.788 99.0933 81.508 95.4307 77.244 92.916C73.0893 90.4013 68.3333 89.144 62.976 89.144C54.3387 89.144 47.3413 92.1507 41.984 98.164C36.6267 104.177 33.948 112.213 33.948 122.272C33.948 132.331 36.6267 140.367 41.984 146.38C47.3413 152.393 54.3387 155.4 62.976 155.4C68.3333 155.4 73.0893 154.143 77.244 151.628C81.508 149.113 84.788 145.451 87.084 140.64H117.916C114.636 153.104 108.131 162.944 98.4 170.16C88.6693 177.267 76.9707 180.82 63.304 180.82C52.152 180.82 42.148 178.36 33.292 173.44C24.5453 168.411 17.712 161.468 12.792 152.612C7.872 143.756 5.412 133.643 5.412 122.272ZM156.574 103.74C159.854 98.7107 163.954 94.7747 168.874 91.932C173.794 88.98 179.261 87.504 185.274 87.504V117.188H177.566C170.569 117.188 165.321 118.719 161.822 121.78C158.323 124.732 156.574 129.98 156.574 137.524V180H128.53V88.488H156.574V103.74ZM278.382 132.768C278.382 135.392 278.218 138.125 277.89 140.968H214.422C214.86 146.653 216.664 151.027 219.834 154.088C223.114 157.04 227.105 158.516 231.806 158.516C238.804 158.516 243.669 155.564 246.402 149.66H276.25C274.72 155.673 271.932 161.085 267.886 165.896C263.95 170.707 258.976 174.479 252.962 177.212C246.949 179.945 240.225 181.312 232.79 181.312C223.825 181.312 215.844 179.399 208.846 175.572C201.849 171.745 196.382 166.279 192.446 159.172C188.51 152.065 186.542 143.756 186.542 134.244C186.542 124.732 188.456 116.423 192.282 109.316C196.218 102.209 201.685 96.7427 208.682 92.916C215.68 89.0893 223.716 87.176 232.79 87.176C241.646 87.176 249.518 89.0347 256.406 92.752C263.294 96.4693 268.652 101.772 272.478 108.66C276.414 115.548 278.382 123.584 278.382 132.768ZM249.682 125.388C249.682 120.577 248.042 116.751 244.762 113.908C241.482 111.065 237.382 109.644 232.462 109.644C227.761 109.644 223.77 111.011 220.49 113.744C217.32 116.477 215.352 120.359 214.586 125.388H249.682ZM281.041 134.08C281.041 124.677 282.79 116.423 286.289 109.316C289.897 102.209 294.762 96.7427 300.885 92.916C307.008 89.0893 313.841 87.176 321.385 87.176C327.836 87.176 333.466 88.488 338.277 91.112C343.197 93.736 346.969 97.18 349.593 101.444V88.488H377.637V180H349.593V167.044C346.86 171.308 343.033 174.752 338.113 177.376C333.302 180 327.672 181.312 321.221 181.312C313.786 181.312 307.008 179.399 300.885 175.572C294.762 171.636 289.897 166.115 286.289 159.008C282.79 151.792 281.041 143.483 281.041 134.08ZM349.593 134.244C349.593 127.247 347.625 121.725 343.689 117.68C339.862 113.635 335.161 111.612 329.585 111.612C324.009 111.612 319.253 113.635 315.317 117.68C311.49 121.616 309.577 127.083 309.577 134.08C309.577 141.077 311.49 146.653 315.317 150.808C319.253 154.853 324.009 156.876 329.585 156.876C335.161 156.876 339.862 154.853 343.689 150.808C347.625 146.763 349.593 141.241 349.593 134.244ZM442.37 156.22V180H428.102C417.934 180 410.007 177.54 404.322 172.62C398.636 167.591 395.794 159.445 395.794 148.184V111.776H384.642V88.488H395.794V66.184H423.838V88.488H442.206V111.776H423.838V148.512C423.838 151.245 424.494 153.213 425.806 154.416C427.118 155.619 429.304 156.22 432.366 156.22H442.37ZM465.535 78.976C460.615 78.976 456.569 77.5547 453.399 74.712C450.337 71.76 448.807 68.152 448.807 63.888C448.807 59.5147 450.337 55.9067 453.399 53.064C456.569 50.112 460.615 48.636 465.535 48.636C470.345 48.636 474.281 50.112 477.343 53.064C480.513 55.9067 482.099 59.5147 482.099 63.888C482.099 68.152 480.513 71.76 477.343 74.712C474.281 77.5547 470.345 78.976 465.535 78.976ZM479.475 88.488V180H451.431V88.488H479.475ZM534.402 153.76L554.246 88.488H584.094L551.622 180H517.018L484.546 88.488H514.558L534.402 153.76ZM675.602 132.768C675.602 135.392 675.438 138.125 675.11 140.968H611.642C612.079 146.653 613.883 151.027 617.054 154.088C620.334 157.04 624.325 158.516 629.026 158.516C636.023 158.516 640.889 155.564 643.622 149.66H673.47C671.939 155.673 669.151 161.085 665.106 165.896C661.17 170.707 656.195 174.479 650.182 177.212C644.169 179.945 637.445 181.312 630.01 181.312C621.045 181.312 613.063 179.399 606.066 175.572C599.069 171.745 593.602 166.279 589.666 159.172C585.73 152.065 583.762 143.756 583.762 134.244C583.762 124.732 585.675 116.423 589.502 109.316C593.438 102.209 598.905 96.7427 605.902 92.916C612.899 89.0893 620.935 87.176 630.01 87.176C638.866 87.176 646.738 89.0347 653.626 92.752C660.514 96.4693 665.871 101.772 669.698 108.66C673.634 115.548 675.602 123.584 675.602 132.768ZM646.902 125.388C646.902 120.577 645.262 116.751 641.982 113.908C638.702 111.065 634.602 109.644 629.682 109.644C624.981 109.644 620.99 111.011 617.71 113.744C614.539 116.477 612.571 120.359 611.806 125.388H646.902Z"
            fill="#181818"
          />
        </svg>
      )}
    </>
  );
};
