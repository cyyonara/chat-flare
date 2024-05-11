import React from "react";
import { Outlet } from "react-router-dom";

interface IProps {}

const AuthLayout: React.FC<IProps> = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-[1.7] items-center justify-center border-r">
        <div className="flex max-w-[900px] flex-1 flex-col items-center justify-center gap-y-8">
          <h1 className="font-bold">
            Chat <span className="text-primary">Flare</span>
          </h1>
          <svg
            className="max-h-[500px] w-full"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            width="987.58708"
            height="714.02784"
            viewBox="0 0 987.58708 714.02784"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M252.61515,599.13972a10.05579,10.05579,0,0,0-15.32038-1.74408l-31.75442-16.39011,1.974,18.46448,29.8519,12.73352a10.11027,10.11027,0,0,0,15.24888-13.06381Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#a0616a"
            />
            <path
              d="M224.39486,606.5719a4.505,4.505,0,0,1-3.669.03913L190.56372,593.527a46.37349,46.37349,0,0,1-23.462-22.69753l-15.857-33.47117a14.49652,14.49652,0,1,1,22.90078-17.78059l27.8727,51.71356,25.7368,19.44155a4.51467,4.51467,0,0,1,1.58664,4.9213l-2.5261,8.15924a4.50563,4.50563,0,0,1-1.52374,2.21147A4.45468,4.45468,0,0,1,224.39486,606.5719Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ccc"
            />
            <circle cx="44.34042" cy="380.44738" r="24.56103" fill="#a0616a" />
            <polygon
              points="54.289 702.644 66.548 702.643 72.381 655.355 54.286 655.356 54.289 702.644"
              fill="#a0616a"
            />
            <path
              d="M157.86813,792.12617h38.53072a0,0,0,0,1,0,0V807.013a0,0,0,0,1,0,0H172.755a14.88688,14.88688,0,0,1-14.88688-14.88688v0A0,0,0,0,1,157.86813,792.12617Z"
              transform="translate(248.09701 1506.14504) rotate(179.99738)"
              fill="#2f2e41"
            />
            <polygon
              points="14.289 702.644 26.548 702.643 32.381 655.355 14.286 655.356 14.289 702.644"
              fill="#a0616a"
            />
            <path
              d="M117.86813,792.12617h38.53072a0,0,0,0,1,0,0V807.013a0,0,0,0,1,0,0H132.755a14.88688,14.88688,0,0,1-14.88688-14.88688v0a0,0,0,0,1,0,0Z"
              transform="translate(168.09701 1506.14687) rotate(179.99738)"
              fill="#2f2e41"
            />
            <path
              d="M116.21424,782.09418a4.49853,4.49853,0,0,1-1.075-3.5586l21.46459-160.98535,53.32862,9.05664,5.6914-3.415L180.90638,775.936a4.51234,4.51234,0,0,1-4.0962,3.96387l-16.1477,1.3457a4.49919,4.49919,0,0,1-4.86646-4.74218l4.18067-72.74219a.50006.50006,0,0,0-.98194-.16016l-20.6831,76.7002a4.50774,4.50774,0,0,1-4.34473,3.3291H119.6A4.49845,4.49845,0,0,1,116.21424,782.09418Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#2f2e41"
            />
            <path
              d="M153.14661,628.81878a3.53283,3.53283,0,0,0-4.51611-.18847l-10.66187,8.293a4.49611,4.49611,0,0,1-7.0874-2.30664c-5.22974-18.31543-17.07837-64.418-14.15943-96.86621,1.65455-18.39258,17.53711-32.3711,35.405-31.19825,12.21558.81446,20.252,7.86133,23.886,20.94434,8.92261,32.12207,18.72827,91.04394,20.60327,102.53027a4.48018,4.48018,0,0,1-2.13647,4.58887,32.93918,32.93918,0,0,1-16.6919,4.69727C170.66858,639.31293,162.13245,636.83441,153.14661,628.81878Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ccc"
            />
            <path
              d="M157.16952,640.24538a10.05578,10.05578,0,0,0-10.9788-10.8269l-14.87184-32.49319-9.84154,15.74731,15.63136,28.44185a10.11028,10.11028,0,0,0,20.06082-.86907Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#a0616a"
            />
            <path
              d="M130.37732,628.67816a4.505,4.505,0,0,1-2.91113-2.2334L111.807,597.53558a46.37355,46.37355,0,0,1-4.45435-32.33887l8.17847-36.123a14.49652,14.49652,0,1,1,28.99268.1416l-9.98145,57.89258,8.25366,31.18066a4.51466,4.51466,0,0,1-1.78857,4.85156l-7.023,4.86133a4.50566,4.50566,0,0,1-2.56372.79981A4.45459,4.45459,0,0,1,130.37732,628.67816Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ccc"
            />
            <polygon
              points="36.325 460.644 27.325 498.644 40.325 530.644 31.325 499.644 36.325 460.644"
              opacity="0.2"
            />
            <path
              d="M136.53113,493.63031a16.53856,16.53856,0,0,1-6.388-1.15576c-.89411-.34457-1.82225-.62778-2.71471-.97258-7.88169-3.04509-13.07366-11.43906-13.25961-19.88649s4.18867-16.64645,10.68463-22.04981,14.90986-8.17746,23.335-8.819c9.07522-.691,19.29421,1.61043,24.36535,9.16825,1.34985,2.01177,2.29388,4.45259,1.494,6.88161a4.40355,4.40355,0,0,1-1.24079,1.90593c-2.2647,2.01486-4.5225.49988-6.83117.366-3.17324-.184-6.02337,2.38457-7.04775,5.39355s-.57345,6.32161.25366,9.39068a23.45909,23.45909,0,0,1,1.1825,5.71009,5.74057,5.74057,0,0,1-2.37856,5.05471c-1.98289,1.19858-4.58693.5049-6.571-.69175s-3.69842-2.86047-5.84155-3.74105-5.02243-.68526-6.26983,1.26728a6.93489,6.93489,0,0,0-.79266,2.28861c-1.11828,5.09486-.86126,4.7948-1.97954,9.88966Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#2f2e41"
            />
            <path
              d="M863.54046,323.46608h-607a8.72772,8.72772,0,0,0-8.72021,8.72v411.32a8.72777,8.72777,0,0,0,8.72021,8.72h607a8.71218,8.71218,0,0,0,6.62989-3.06,2.03961,2.03961,0,0,0,.18994-.24005,8.16514,8.16514,0,0,0,1.25-2.11,8.4986,8.4986,0,0,0,.65967-3.31v-256.05h-2.48975v256.05a6.17851,6.17851,0,0,1-1.02978,3.42,6.4528,6.4528,0,0,1-2.36036,2.12006,6.18228,6.18228,0,0,1-2.84961.69h-607a6.23767,6.23767,0,0,1-6.23046-6.23v-411.32a6.23762,6.23762,0,0,1,6.23046-6.23h607a6.23929,6.23929,0,0,1,6.23975,6.23v55.27H872.27v-55.27A8.72938,8.72938,0,0,0,863.54046,323.46608Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#3f3d56"
            />
            <rect
              x="142.85499"
              y="265.43289"
              width="621.95676"
              height="2.49281"
              fill="#3f3d56"
            />
            <circle cx="164.0439" cy="249.17978" r="7.47844" fill="#ccc" />
            <circle cx="185.5444" cy="249.17978" r="7.47844" fill="#ccc" />
            <circle cx="207.04491" cy="249.17978" r="7.47844" fill="#ccc" />
            <path
              d="M463.46251,701.8104a15.47928,15.47928,0,0,1-14.06636-21.78153l17.81618-39.74993a131.98635,131.98635,0,0,1-44.5412-99.096c0-73.18485,59.5405-132.72686,132.72686-132.72686s132.72685,59.542,132.72685,132.72686S628.58435,673.90979,555.398,673.90979a131.98538,131.98538,0,0,1-37.79816-5.56746l-45.46962,30.78231A15.43283,15.43283,0,0,1,463.46251,701.8104ZM555.398,426.9761a114.14066,114.14066,0,0,0-71.10648,203.47915l5.61268,4.47627-19.16961,42.77331,43.99109-29.78156,4.34364,1.45894A114.17525,114.17525,0,1,0,555.398,426.9761Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#3f3d56"
            />
            <circle cx="449.19153" cy="442.02351" r="18.52003" fill="#3f3d56" />
            <circle cx="396.71812" cy="442.02351" r="18.52003" fill="#3f3d56" />
            <circle cx="501.66494" cy="442.02351" r="18.52003" fill="#3f3d56" />
            <path
              d="M1021.11847,461.708h-176a8,8,0,1,1,0-16h176a8,8,0,0,1,0,16Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ccc"
            />
            <path
              d="M906.11847,427.708h-61a8,8,0,1,1,0-16h61a8,8,0,0,1,0,16Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ccc"
            />
            <circle cx="659.19545" cy="344.46999" r="34" fill="#f59900" />
            <path
              d="M1038.76019,385.45607h-317a17.02411,17.02411,0,0,0-17,17v70a17.0241,17.0241,0,0,0,17,17h317a17.0241,17.0241,0,0,0,17-17v-70A17.02411,17.02411,0,0,0,1038.76019,385.45607Zm15,87a15.01828,15.01828,0,0,1-15,15h-317a15.01828,15.01828,0,0,1-15-15v-70a15.01828,15.01828,0,0,1,15-15h317a15.01828,15.01828,0,0,1,15,15Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#3f3d56"
            />
            <circle cx="947.55373" cy="297.46999" r="23" fill="#f59900" />
            <path
              d="M1053.05308,403.3911a.99636.99636,0,0,1-.29278-.70711V377.22815a.99989.99989,0,1,1,1.99978,0V402.684a1,1,0,0,1-1.707.70711Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#fff"
            />
            <path
              d="M1040.32516,390.66318a1,1,0,0,1,.70711-1.707h25.45584a.99989.99989,0,1,1,0,1.99978h-25.45584A.99632.99632,0,0,1,1040.32516,390.66318Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#fff"
            />
            <path
              d="M1081.29354,696.16254h-48.00977c0,1.38-49.48,2.5-49.48,2.5a12.85953,12.85953,0,0,0-2.10986,2,12.41027,12.41027,0,0,0-2.90039,8v2a12.5046,12.5046,0,0,0,12.5,12.5h90a12.51087,12.51087,0,0,0,12.5-12.5v-2A12.51734,12.51734,0,0,0,1081.29354,696.16254Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#3f3d56"
            />
            <rect
              x="924.08229"
              y="629.67987"
              width="13"
              height="84"
              fill="#3f3d56"
            />
            <path
              d="M1080.28875,806.20926c0,1.40463-19.69947.54331-44,.54331s-44,.86132-44-.54331,19.69947-12.54331,44-12.54331S1080.28875,804.80463,1080.28875,806.20926Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#3f3d56"
            />
            <circle cx="934.75302" cy="462.60848" r="28" fill="#2f2e41" />
            <polygon
              points="865.073 702.175 852.813 702.174 846.98 654.886 865.075 654.887 865.073 702.175"
              fill="#ffb8b8"
            />
            <path
              d="M844.05565,698.67127h23.64384a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H829.16877a0,0,0,0,1,0,0v0A14.88688,14.88688,0,0,1,844.05565,698.67127Z"
              fill="#2f2e41"
            />
            <polygon
              points="845.935 695.332 834.238 691.661 842.83 644.796 860.094 650.214 845.935 695.332"
              fill="#ffb8b8"
            />
            <path
              d="M930.70811,779.653H954.352a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H915.82124a0,0,0,0,1,0,0v0A14.88687,14.88687,0,0,1,930.70811,779.653Z"
              transform="translate(172.36375 -336.85715) rotate(17.42262)"
              fill="#2f2e41"
            />
            <path
              d="M1048.4599,687.96532a37.87191,37.87191,0,0,0-1.52-7.02l-2.29-2.88-5.96-7.48-.25977.01c-.44043.02-2.2705.12-5.10009.34h-.03028c-1.75.14-3.89013.32-6.31982.55-.64014.07-1.31006.13-2,.2v10.44h12.5a2.50441,2.50441,0,0,1,2.48,2.18c.00976.11.02.21.02.32a2.501,2.501,0,0,1-2.5,2.5h-72.6001a28.404,28.404,0,0,0-2.66016,2,14.88159,14.88159,0,0,0-5.25,7.86c-4.23974,18.64-11.96972,53.4-14.25,63.61005a4.53815,4.53815,0,0,0,1.3501,4.28,4.43605,4.43605,0,0,0,1.47022.91l9.02,3.37994a4.79245,4.79245,0,0,0,1.1499.27c.0498,0,.08984.01.14013.01a2.61378,2.61378,0,0,0,.27979.01,4.53215,4.53215,0,0,0,4.21-2.9l7.12012-18.68,10.97021-28.8,4.33985-11.39c5.02978,1.18,47.23,10.52,61.35986-4.53a16.06763,16.06763,0,0,0,3.24023-5.11A20.80166,20.80166,0,0,0,1048.4599,687.96532Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#2f2e41"
            />
            <path
              d="M1060.69964,690.68529c-.21972-.89-.46972-1.81-.75976-2.74l-8.25-10.36-.25977.01c-.5205.03-2.99023.16-6.78027.47-4.29981.36-10.31006.94-17.06006,1.85-.19971.02-.40967.05005-.60986.08-.66016.09-1.33008.18-2,.28v1.85h12.5a2.50441,2.50441,0,0,1,2.48,2.18c.00976.11.02.21.02.32a2.501,2.501,0,0,1-2.5,2.5H993.29974c-1.92969.63-3.79,1.29-5.56982,2-9.33985,3.7-16.33008,8.55-17.76026,14.86-.48,2.12-1.00976,4.45-1.56982,6.93-2.08008,9.22-4.60986,20.51-6.8999,30.77v.01c-.47022,2.12-.93994,4.18-1.39014,6.18-1.91016,8.6-3.52978,15.89-4.39014,19.72-.02.11-.03955.21-.06.31994v.02a4.66711,4.66711,0,0,0,.28027,2.29l.00976.01v.01a4.42988,4.42988,0,0,0,1.3003,1.79,4.59324,4.59324,0,0,0,1.29.75l9.02,3.37994a4.58027,4.58027,0,0,0,1.56982.29,4.43486,4.43486,0,0,0,2.1499-.55,4.501,4.501,0,0,0,2.06006-2.35l19.41992-50.96,3.01026-7.91c5.02978,1.18,47.23,10.51,61.35986-4.53a16.89113,16.89113,0,0,0,4.48-11.07A29.68657,29.68657,0,0,0,1060.69964,690.68529Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#2f2e41"
            />
            <path
              d="M1059.58978,602.46532c-.15967-.19-.33008-.38-.50976-.56a24.47216,24.47216,0,0,0-20.97022-7.39,79.3619,79.3619,0,0,0-9.91016,1.95,24.98105,24.98105,0,0,0-11.17968,6.27,24.41416,24.41416,0,0,0-7.41016,18.2c.04,1.37.04981,2.77.03027,4.19,0,.66-.01025,1.33-.02,2h9.85987a5.31954,5.31954,0,0,1,1.27.15,5.511,5.511,0,0,1,4.23,5.35v46.52c.66992.19,1.33984.38,2,.58.21.07.41015.13.60986.18994.23.07.46.14.68018.21q3.04467.945,5.9497,2h3.26026a2.50441,2.50441,0,0,1,2.48,2.18c.68017.27,1.33984.54,1.98974.81,2.31006.96,4.5,1.92,6.51026,2.85,2.71,1.24,5.12012,2.42,7.14013,3.44995a4.5871,4.5871,0,0,0,2.04981.5,4.404,4.404,0,0,0,2.6001-.86,5.52922,5.52922,0,0,0,.4497-.37,4.50453,4.50453,0,0,0,1.37012-3.98,128.08608,128.08608,0,0,1-.8999-23.7c.27978-6.65.87988-13.47,1.66016-20.06.41992-3.57.88964-7.07,1.37988-10.44.47021-3.22.97021-6.31,1.46-9.23A24.60707,24.60707,0,0,0,1059.58978,602.46532Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#f59900"
            />
            <path
              d="M1018.6,603.28533a11.85877,11.85877,0,0,0-1.58007-.55005,11.49857,11.49857,0,0,0-13.54,6.53l-6.87012,15.86-.85986,2h23.73a5.31954,5.31954,0,0,1,1.27.15l.7998-1.85,3.04-7.02A11.5115,11.5115,0,0,0,1018.6,603.28533Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#f59900"
            />
            <circle cx="933.7294" cy="469.15966" r="24.56103" fill="#ffb8b8" />
            <path
              d="M1014.93275,550.07866a88.59073,88.59073,0,0,0,38.32618,12.62844l-4.03991-4.84062a29.68836,29.68836,0,0,0,9.17074,1.82106c3.1302-.04875,6.40986-1.254,8.18641-3.83172a9.342,9.342,0,0,0,.62532-8.62973,17.69416,17.69416,0,0,0-5.56637-6.96015,33.1395,33.1395,0,0,0-30.84447-5.51247,19.80612,19.80612,0,0,0-9.21237,5.90942c-2.32839,2.87238-6.81095,5.43156-5.6188,8.93167Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#2f2e41"
            />
            <path
              d="M1044.06564,530.2578a75.4847,75.4847,0,0,0-27.463-17.7592c-6.63872-2.45942-13.86459-3.97895-20.80509-2.58226s-13.50411,6.19807-15.44041,13.00778c-1.58332,5.56836.05158,11.56379,2.50871,16.80555s5.73758,10.10247,7.72463,15.53986a35.46793,35.46793,0,0,1-35.689,47.56226c6.81938.91438,13.10516,4.11905,19.77076,5.82483s14.53281,1.59011,19.48624-3.18519c5.24091-5.05243,5.34585-13.26718,5.09246-20.54248q-.565-16.22249-1.13-32.445c-.1921-5.51543-.35615-11.20763,1.63288-16.35551s6.71617-9.65569,12.23475-9.60884c4.18253.0355,7.88443,2.56925,11.23866,5.068s6.90445,5.16473,11.07059,5.53641,8.92293-2.71145,8.61118-6.8825Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#2f2e41"
            />
            <path
              d="M1064.2099,632.5053l-14.02.38-1.02,9.85-.23,2.28-21.96,9.86-2,.9v17.53l2-.57,6.31982-1.8h.03028l27.83984-7.93.31982-.09a10.87892,10.87892,0,0,0,7.86035-10.35l.06983-11.63.06006-8.57Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ffb8b8"
            />
            <path
              d="M1068.77,613.02532a11.50161,11.50161,0,0,0-22.96,1.41l1.52978,24.96a4.48638,4.48638,0,0,0,1.83008,3.34,4.43544,4.43544,0,0,0,2.93994.87l10.72022-.66,3.25-.2a4.385,4.385,0,0,0,3.10009-1.51,3.13685,3.13685,0,0,0,.23975-.3,4.46883,4.46883,0,0,0,.87988-2.96Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#f59900"
            />
            <path
              d="M1028.27,680.1253h-1.29v-.13c-.66016.09-1.33008.18-2,.28v1.85h9.23974Q1031.30975,681.07527,1028.27,680.1253Zm0,0h-1.29v-.13c-.66016.09-1.33008.18-2,.28v1.85h9.23974Q1031.30975,681.07527,1028.27,680.1253Zm9.21,0h-10.5v-47.5a7.51081,7.51081,0,0,0-5.43018-7.2,7.05084,7.05084,0,0,0-2.06982-.3h-89a7.50906,7.50906,0,0,0-7.5,7.5v49a7.50264,7.50264,0,0,0,7.5,7.5h107a4.50457,4.50457,0,0,0,4.46972-4.01,3.90321,3.90321,0,0,0,.03028-.49A4.5068,4.5068,0,0,0,1037.47992,680.1253Zm2.5,4.5a2.501,2.501,0,0,1-2.5,2.5h-107a5.50325,5.50325,0,0,1-5.5-5.5v-49a5.50328,5.50328,0,0,1,5.5-5.5h89a5.31954,5.31954,0,0,1,1.27.15,5.511,5.511,0,0,1,4.23,5.35v49.5h12.5a2.50441,2.50441,0,0,1,2.48,2.18C1039.96966,684.41527,1039.97992,684.51531,1039.97992,684.6253Zm-11.71-4.5h-1.29v-.13c-.66016.09-1.33008.18-2,.28v1.85h9.23974Q1031.30975,681.07527,1028.27,680.1253Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#3f3d56"
            />
            <circle cx="868.77037" cy="564.14065" r="6" fill="#f59900" />
            <path
              d="M439.06012,164.35405a8.70139,8.70139,0,0,0,.04121,1.36952l-31.402,26.354-9.36436-3.39054-6.96408,13.46368,20.47353,9.74541,34.32982-38.5237a8.67616,8.67616,0,1,0-7.11415-9.0184Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ffb8b8"
            />
            <path
              d="M396.94462,208.60875l-30.32374-10.94532a11.15948,11.15948,0,1,1,7.5775-20.99328l30.32374,10.94532a3.719,3.719,0,0,1,2.23573,4.76131l-5.05138,13.996a3.72507,3.72507,0,0,1-4.76185,2.236Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ccc"
            />
            <polygon
              points="268.53 222.252 278.664 222.251 283.485 183.161 268.528 183.162 268.53 222.252"
              fill="#ffb8b8"
            />
            <path
              d="M372.56455,312.34163h31.85073a0,0,0,0,1,0,0v12.306a0,0,0,0,1,0,0H384.87051a12.306,12.306,0,0,1-12.306-12.306v0A0,0,0,0,1,372.56455,312.34163Z"
              transform="translate(670.78791 543.98542) rotate(179.99738)"
              fill="#2f2e41"
            />
            <polygon
              points="243.484 209.16 251.774 214.989 278.202 185.786 265.967 177.184 243.484 209.16"
              fill="#ffb8b8"
            />
            <path
              d="M342.14251,304.56881h31.85073a0,0,0,0,1,0,0v12.306a0,0,0,0,1,0,0H354.44846a12.306,12.306,0,0,1-12.306-12.306v0a0,0,0,0,1,0,0Z"
              transform="translate(366.06052 677.86526) rotate(-144.88912)"
              fill="#2f2e41"
            />
            <path
              d="M396.91161,244.82224s25.29074-2.98391,20.75137,13.42758-55.12085,30.585-55.12085,30.585Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ffb8b8"
            />
            <circle cx="273.2979" cy="47.79378" r="20.30293" fill="#ffb8b8" />
            <path
              d="M314.75691,285.47425c-11.55267-13.45215-15.59541-34.09777,2.82823-51.26895a60.72455,60.72455,0,0,1,15.27978-10.14723l14.8487-41.52534a22.62793,22.62793,0,0,1,20.911-15.04164,21.6549,21.6549,0,0,1,21.00667,13.50946,18.79648,18.79648,0,0,1,.58324,13.31168,213.82549,213.82549,0,0,1-17.32517,39.6404l.76771,6.14242,37.53183,3.33559-.35014.56912c-.18265.29707-18.55139,28.28389-42.04986,46.86051-8.03484,6.35151-16.34334,8.984-24.185,8.98317C332.713,299.84263,321.89791,293.789,314.75691,285.47425Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ccc"
            />
            <path
              d="M311.21466,147.14946c3.5919-4.28019,5.13255-9.87862,6.37209-15.32706,1.96083-8.6208,3.47848-17.535,7.83525-25.22811,4.35636-7.693,12.36275-14.06743,21.19052-13.58222,8.77731.48244,15.87351,7.54413,19.64018,15.57892a6.987,6.987,0,0,1,5.67381.27356c2.71481,1.48666,3.72993,5.71225,1.47,7.82762a18.75674,18.75674,0,0,1,15.27413-.38077,18.46283,18.46283,0,0,1,11.18375,15.66822,10.06567,10.06567,0,0,1-2.67646,7.5519c-3.89543,4.0102-9.405,2.62691-14.30381,1.60533-4.6272-.96488-10.26307-1.22537-12.8697,3.18337a8.26332,8.26332,0,0,0-.804,6.03869c.99858,4.40107,4.25707,7.46663,7.41829,10.40051l.517.96049c-11.16155,2.17656-23.34993-5.44617-26.27785-16.43451s3.85142-23.665,14.61621-27.33068h0a4.02543,4.02543,0,0,1-3.6141-6.03152,19.13588,19.13588,0,0,0-9.76661-2.43671c-5.56039.36478-10.37245,4.32286-13.26607,9.08493-2.894,4.76211-4.2042,10.28946-5.53173,15.70142-1.32713,5.412-2.76365,10.92754-5.85787,15.562a24.765,24.765,0,0,1-39.67753,2.0352A19.76374,19.76374,0,0,0,311.21466,147.14946Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#2f2e41"
            />
            <circle cx="354.12853" cy="79.9818" r="29.51181" fill="#f59900" />
            <path
              d="M459.42769,189.56511a1.27848,1.27848,0,0,1-.37568-.90731v-32.663a1.283,1.283,0,0,1,2.566,0v32.663a1.28312,1.28312,0,0,1-2.19029.90731Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#fff"
            />
            <path
              d="M443.09621,173.23363a1.28312,1.28312,0,0,1,.9073-2.19029h32.663a1.283,1.283,0,1,1,0,2.566h-32.663A1.27844,1.27844,0,0,1,443.09621,173.23363Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#fff"
            />
            <path
              d="M440.0774,192.70737a8.70282,8.70282,0,0,0-.54479,1.25717l-39.62575,10.508-7.03529-7.04925-12.02628,9.227,14.39,17.52332,47.44852-20.27929a8.67616,8.67616,0,1,0-2.6064-11.187Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ffb8b8"
            />
            <path
              d="M383.14557,214.865l-22.79615-22.79616A11.15948,11.15948,0,1,1,376.13131,176.287l22.79616,22.79616a3.719,3.719,0,0,1,0,5.26009l-10.5212,10.5218a3.7251,3.7251,0,0,1-5.2607,0Z"
              transform="translate(-106.20646 -92.98608)"
              fill="#ccc"
            />
          </svg>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            pariatur veritatis omnis debitis quidem distinctio ad vitae nemo,
            hic sed fuga assumenda, vero dolorum iure dolor rem. Impedit
            pariatur labore officia quasi, minus ex totam quia perspiciatis
            magni ipsa molestias quibusdam maxime consequuntur provident. Labore
            impedit fugiat, cumque molestias nesciunt ullam placeat quam minima
            repudiandae facilis quae optio voluptatum, aut cum architecto?
            Incidunt, harum animi! Quis itaque tempore nesciunt perspiciatis
            praesentium doloribus omnis accusamus quod commodi, dolorem corrupti
            maiores! Perferendis distinctio eos blanditiis doloribus impedit
            repudiandae iure nisi consequuntur, culpa modi qui temporibus dolore
            illum, facilis reiciendis voluptatum neque. Ipsa!
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
