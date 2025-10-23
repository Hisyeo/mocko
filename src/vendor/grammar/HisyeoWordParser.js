// Generated from /run/media/jake/Windows/Users/madca/IdeaProjects/antlr-hisyeo/grammar/HisyeoWordParser.g4 by ANTLR 4.13.2
// jshint ignore: start
import antlr4 from 'antlr4';
import HisyeoWordParserListener from './HisyeoWordParserListener.js';
import HisyeoWordParserVisitor from './HisyeoWordParserVisitor.js';

const serializedATN = [4,1,884,25,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,5,0,0,6,0,2,
4,6,8,10,0,6,6,0,180,180,354,354,539,539,639,639,827,827,829,829,12,0,26,
26,35,35,49,49,105,105,347,347,504,504,543,543,750,750,763,763,771,771,774,
774,786,786,120,0,11,12,14,14,18,18,30,30,34,34,36,38,41,41,56,56,77,77,
83,83,85,85,95,95,106,106,115,115,118,118,132,132,138,138,145,146,149,149,
159,161,181,181,185,185,188,189,196,197,203,203,216,216,225,225,246,246,
248,248,252,252,255,255,257,257,279,279,281,281,286,286,288,288,301,301,
316,317,321,322,330,330,332,332,344,344,346,346,356,356,360,360,362,362,
364,366,369,370,375,376,378,378,380,380,389,389,391,391,393,393,395,395,
404,404,410,410,418,418,424,424,437,437,443,443,446,448,462,462,466,466,
476,476,480,480,485,485,487,490,496,496,499,499,502,502,506,506,510,511,
520,522,532,532,548,548,555,555,558,558,561,562,580,580,582,583,588,588,
590,592,596,596,606,606,614,614,616,616,632,632,635,635,649,649,657,657,
659,659,663,664,668,668,670,670,678,679,685,685,687,687,699,699,701,701,
725,725,741,741,743,743,768,768,778,778,790,790,795,795,797,797,800,802,
806,806,811,812,823,823,832,832,841,842,852,852,855,855,866,866,876,876,
882,882,884,884,210,0,13,13,16,17,20,20,22,23,27,28,39,40,42,44,47,47,50,
50,60,60,62,62,64,64,67,67,70,72,76,76,78,78,80,80,82,82,84,84,87,88,91,
91,94,94,97,97,99,99,102,102,104,104,108,110,114,114,122,124,126,126,128,
128,130,131,134,134,139,140,142,144,148,148,151,152,154,154,156,156,162,
162,165,166,168,170,172,173,186,187,190,190,194,194,199,200,207,209,213,
213,215,215,218,219,226,228,231,233,235,242,244,245,249,249,251,251,260,
260,265,265,268,270,272,275,278,278,280,280,282,282,287,287,289,294,298,
298,300,300,302,302,312,315,320,320,323,323,325,326,328,328,336,336,340,
340,343,343,349,350,352,352,357,359,363,363,367,367,372,372,379,379,381,
381,384,387,398,400,402,403,408,409,411,413,415,415,417,417,421,423,426,
430,432,432,436,436,438,438,441,442,445,445,453,453,456,456,459,459,463,
464,467,467,470,470,472,474,478,479,481,481,483,484,493,493,495,495,497,
498,503,503,505,505,507,507,509,509,515,516,518,518,524,527,530,531,534,
537,542,542,544,544,547,547,549,549,551,551,553,554,557,557,559,560,563,
563,565,566,569,571,581,581,584,585,587,587,593,593,595,595,597,597,599,
600,604,604,612,612,615,615,618,618,624,624,627,630,633,633,638,638,641,
642,644,644,646,646,650,651,654,654,662,662,666,666,671,674,676,676,680,
680,682,683,686,686,691,691,693,694,696,697,706,706,709,709,711,712,714,
715,717,719,724,724,726,726,728,729,731,731,734,734,737,737,742,742,744,
747,749,749,751,752,754,756,765,765,769,770,776,777,780,780,782,782,784,
785,789,789,792,794,796,796,799,799,803,804,807,807,809,809,814,819,822,
822,824,825,828,828,830,830,834,836,847,847,849,851,853,854,856,856,859,
859,862,862,864,865,869,869,871,871,873,873,875,875,878,879,883,883,192,
0,15,15,19,19,21,21,25,25,29,29,32,33,45,46,51,52,65,65,68,69,73,74,79,79,
81,81,86,86,92,93,96,96,98,98,100,101,103,103,111,113,116,116,119,121,125,
125,129,129,133,133,135,137,147,147,150,150,153,153,155,155,157,158,163,
164,167,167,171,171,174,174,176,179,183,184,191,193,195,195,198,198,201,
202,205,206,210,212,214,214,220,222,224,224,230,230,234,234,243,243,247,
247,250,250,253,254,256,256,258,259,261,263,266,267,271,271,276,277,284,
285,296,297,299,299,303,303,305,306,309,309,311,311,318,319,324,324,327,
327,329,329,331,331,333,335,337,339,341,342,348,348,351,351,353,353,355,
355,361,361,368,368,371,371,373,374,377,377,382,383,388,388,390,390,392,
392,394,394,396,397,401,401,406,407,414,414,416,416,420,420,425,425,431,
431,433,435,439,440,449,449,451,452,455,455,457,458,460,460,465,465,468,
469,471,471,475,475,477,477,486,486,491,492,494,494,508,508,512,512,514,
514,519,519,523,523,528,529,533,533,540,541,546,546,550,550,552,552,556,
556,567,568,572,576,578,579,586,586,589,589,594,594,602,603,605,605,608,
608,610,611,613,613,617,617,619,623,625,625,631,631,636,637,640,640,645,
645,647,648,652,653,655,656,658,658,660,661,667,667,669,669,675,675,677,
677,681,681,684,684,688,690,695,695,698,698,700,700,702,705,708,708,713,
713,716,716,720,723,727,727,732,733,735,735,738,740,753,753,757,762,766,
766,772,773,775,775,779,779,781,781,783,783,787,788,791,791,798,798,805,
805,808,808,810,810,813,813,820,821,831,831,833,833,837,839,844,846,848,
848,857,858,860,860,863,863,867,867,870,870,872,872,880,881,5,0,61,61,117,
117,609,609,840,840,868,868,18,0,12,1,0,0,0,2,14,1,0,0,0,4,16,1,0,0,0,6,
18,1,0,0,0,8,20,1,0,0,0,10,22,1,0,0,0,12,13,7,0,0,0,13,1,1,0,0,0,14,15,7,
1,0,0,15,3,1,0,0,0,16,17,7,2,0,0,17,5,1,0,0,0,18,19,7,3,0,0,19,7,1,0,0,0,
20,21,7,4,0,0,21,9,1,0,0,0,22,23,7,5,0,0,23,11,1,0,0,0,0];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class HisyeoWordParser extends antlr4.Parser {

    static grammarFileName = "HisyeoWordParser.g4";
    static literalNames = [ null, null, "'oiyo'", null, "','", null, null, 
                            "'\\u00BF'", "'?'", null, null, "'o\\u00FBt\\u00F4'", 
                            "'ok\\u00FBlo'", "'o\\u00FBd\\u00EE'", "'ok\\u00F4t'", 
                            "'oks\\u00EE\\u00F4s'", "'oklumun'", "'oks\\u00FBn'", 
                            "'ogolol'", "'ogog\\u00EA'", "'oc\\u00FBo'", 
                            "'ot\\u00F4s'", "'okoxu'", "'ostok'", "'odigon'", 
                            "'osyen'", "'oz\\u00FBul'", "'obok\\u00EE'", 
                            "'ob\\u00F4'", "'obunyun'", "'ob\\u00FBl\\u00FB'", 
                            "'ofek'", "'of\\u00EEn\\u00EA'", "'om\\u00FBlto'", 
                            "'onk\\u00FBol'", "'on\\u00F4'", "'onkonu'", 
                            "'onc\\u00EAmon'", "'ondo'", "'ong\\u00F4l\\u00F4'", 
                            "'\\u00F4h\\u00EAl'", "'\\u00F4\\u00EEtun'", 
                            "'onwon\\u00EE'", "'\\u00F4ts\\u00F4tot'", "'onf\\u00EEb\\u00EE'", 
                            "'\\u00F4s\\u00F4l\\u00EA'", "'olt\\u00FB'", 
                            "'\\u00F4st\\u00EE'", "'oldis'", "'\\u00F4fo'", 
                            "'\\u00F4z\\u00EEl'", "'\\u00F4don'", "'\\u00F4bok'", 
                            "'\\u00F4n\\u00EE'", "'et'", "'eson'", "'\\u00F4nt\\u00F4n'", 
                            "'\\u00F4nsu'", "'eswen'", "'\\u00F4l\\u00EA'", 
                            "'eloi'", "'en'", "'elek\\u00EA'", "'\\u00EAo'", 
                            "'\\u00EAts\\u00F4'", "'elent\\u00EAt'", "'elf\\u00FB'", 
                            "'\\u00EAb\\u00F4l'", "'\\u00EAm\\u00EA'", "'\\u00EAfun'", 
                            "'itihos'", "'\\u00EAnbukun'", "'\\u00EAnk\\u00F4m\\u00F4n'", 
                            "'\\u00EAl\\u00EAo'", "'isbulyol'", "'\\u00EAto'", 
                            "'\\u00EEc\\u00EEw\\u00FB'", "'\\u00EEcwon'", 
                            "'istihol'", "'iwot\\u00EA'", "'\\u00EEs\\u00EAns\\u00F4'", 
                            "'infult\\u00EEn'", "'\\u00EEsb\\u00F4nxu'", 
                            "'\\u00EEsk\\u00F4'", "'\\u00EEx\\u00F4l\\u00F4'", 
                            "'\\u00EEmon'", "'\\u00EEb\\u00FBd\\u00FB'", 
                            "'\\u00EEs\\u00EEb\\u00F4'", "'\\u00EEb\\u00FBw\\u00EA'", 
                            "'ilik'", "'\\u00EEn'", "'\\u00EEbol\\u00EA'", 
                            "'uklo'", "'us\\u00FBndul'", "'\\u00EEnbol\\u00EE'", 
                            "'usk\\u00EEfo'", "'ub\\u00F4lni'", "'\\u00EEl\\u00EA'", 
                            "'\\u00EElx\\u00EEzuk'", "'umo'", "'ub\\u00EAnus'", 
                            "'uf\\u00FBl\\u00EEt'", "'undof\\u00F4l'", "'unbol'", 
                            "'uyo'", "'uly\\u00F4'", "'unon'", "'\\u00FB'", 
                            "'unb\\u00FB'", "'\\u00FBs\\u00EAn'", "'\\u00FBc\\u00FBm\\u00EE'", 
                            "'\\u00FBsowo'", "'\\u00FBtok'", "'\\u00FBmom\\u00EE'", 
                            "'\\u00FBsmon'", "'\\u00FBsl\\u00EAk'", "'\\u00FBn\\u00EEd\\u00FB'", 
                            "'\\u00FBn'", "'\\u00FBnhilun'", "'\\u00FBnco\\u00EE'", 
                            "'\\u00FBlk\\u00EAf\\u00EE'", "'\\u00FBlg\\u00FBk\\u00EEn'", 
                            "'\\u00FBlonf\\u00FB'", "'\\u00FBl\\u00F4gun'", 
                            "'\\u00FBnf\\u00FBn\\u00F4'", "'hok\\u00EEk\\u00EE'", 
                            "'\\u00FBlzo'", "'ho\\u00EE'", "'hok\\u00F4l\\u00EE'", 
                            "'hok\\u00FBxi'", "'hoso\\u00FBn'", "'hoxob\\u00EA'", 
                            "'hob\\u00EEy\\u00F4'", "'hom\\u00FBs'", "'hondon'", 
                            "'ho\\u00F4s'", "'hos\\u00EEn'", "'hond\\u00F4t'", 
                            "'hofo'", "'h\\u00F4ktun'", "'h\\u00F4fez\\u00EE'", 
                            "'h\\u00F4n'", "'h\\u00F4nc\\u00F4\\u00FB'", 
                            "'h\\u00F4l\\u00FBk'", "'h\\u00F4lmo'", "'h\\u00F4d\\u00F4k\\u00FB'", 
                            "'h\\u00EAf\\u00EEn'", "'henond\\u00EA'", "'h\\u00F4nyo'", 
                            "'helgo'", "'h\\u00EAlxun'", "'h\\u00EAn\\u00EAl\\u00F4'", 
                            "'hitsu'", "'h\\u00EEtn\\u00F4d\\u00EAt'", "'h\\u00EEsmo'", 
                            "'h\\u00EEzon'", "'hunz\\u00EEd\\u00FB'", "'hul\\u00FBk\\u00F4'", 
                            "'h\\u00FBunhu'", "'h\\u00FBk\\u00EA'", "'h\\u00FBkun'", 
                            "'h\\u00FBsku'", "'h\\u00FBstun'", "'h\\u00FBdul'", 
                            "'h\\u00FBnsik'", "'h\\u00FBzon'", "'h\\u00FBns\\u00FBon'", 
                            "'h\\u00EEy\\u00F4l\\u00EE'", "'h\\u00FBwuncul'", 
                            "'h\\u00FBwu'", "'h\\u00EEsk\\u00FBnco'", "'hiklihos'", 
                            "'h\\u00FBlod\\u00EAk'", "'h\\u00FBl\\u00FB'", 
                            "'kocko'", "'kon'", "'kotilmok'", "'kob\\u00FBt'", 
                            "'kotonhon'", "'konxo'", "'ko'", "'kontol'", 
                            "'k\\u00F4\\u00EE'", "'konbokbo'", "'konwo'", 
                            "'k\\u00F4to'", "'kolowu'", "'k\\u00F4kok\\u00FB'", 
                            "'k\\u00F4s'", "'k\\u00F4son'", "'k\\u00F4tf\\u00FBsu'", 
                            "'k\\u00F4xent\\u00EA'", "'k\\u00F4t\\u00EEk\\u00F4l'", 
                            "'k\\u00F4n\\u00EAn'", "'k\\u00F4m\\u00FB'", 
                            "'k\\u00F4dus'", "'k\\u00F4ndod\\u00FB'", "'k\\u00F4nt\\u00EAsto'", 
                            "'k\\u00F4ndons\\u00EA'", "'k\\u00F4lm\\u00FBdul'", 
                            "'k\\u00F4sm\\u00F4'", "'k\\u00F4ny\\u00EAc'", 
                            "'k\\u00F4nbo'", "'kelo'", "'ke'", "'k\\u00EAsk\\u00EEn'", 
                            "'k\\u00EAx\\u00EEk'", "'k\\u00EAl\\u00F4s'", 
                            "'k\\u00EE\\u00FBng\\u00F4'", "'kistos\\u00EA'", 
                            "'k\\u00EEk\\u00F4l\\u00F4'", "'k\\u00EE\\u00F4s\\u00F4'", 
                            "'kiluk\\u00FB'", "'k\\u00EEsk\\u00F4'", "'k\\u00EEn\\u00F4x\\u00EE'", 
                            "'k\\u00EEno'", "'k\\u00EEso'", "'k\\u00EEns\\u00EA'", 
                            "'ku\\u00FBnm\\u00EA'", "'k\\u00EEnyosel'", 
                            "'k\\u00EEnlik'", "'k\\u00EEldo'", "'k\\u00EEy\\u00F4'", 
                            "'kut'", "'kutin'", "'kud\\u00FBdo'", "'kukwon'", 
                            "'k\\u00FBon'", "'k\\u00FB\\u00F4cyo'", "'k\\u00FBu'", 
                            "'k\\u00FBonl\\u00F4n'", "'k\\u00FBkmut'", "'k\\u00FBsow\\u00EE'", 
                            "'k\\u00FBnont\\u00EE'", "'k\\u00FBzo\\u00FB'", 
                            "'k\\u00FBdu'", "'k\\u00FBmun'", "'k\\u00FB\\u00F4xi'", 
                            "'k\\u00FBnh\\u00EEun'", "'k\\u00FBnc\\u00EEen'", 
                            "'k\\u00FBng\\u00EEyo'", "'k\\u00FBnb\\u00EE'", 
                            "'k\\u00FBld\\u00FB'", "'gos\\u00EEl'", "'gos'", 
                            "'k\\u00FBl\\u00FBnun'", "'gom\\u00EE'", "'k\\u00FBy\\u00F4'", 
                            "'gon\\u00EEso'", "'gonbu'", "'gonz\\u00EEl'", 
                            "'gongox\\u00EE'", "'golo'", "'golfon'", "'golbin\\u00FBs'", 
                            "'golun'", "'g\\u00F4'", "'g\\u00F4c\\u00EEdon'", 
                            "'g\\u00F4nyumon'", "'g\\u00F4wo'", "'g\\u00F4yu'", 
                            "'gemolen'", "'g\\u00F4l\\u00FBo'", "'gelmis'", 
                            "'gitno'", "'g\\u00EAk\\u00F4'", "'g\\u00EE\\u00F4n'", 
                            "'g\\u00EEk'", "'g\\u00EEto'", "'gubuyo'", "'g\\u00EEsg\\u00FBl'", 
                            "'gufis'", "'g\\u00FB\\u00EAy\\u00FB'", "'g\\u00FBexo'", 
                            "'gundol\\u00EA'", "'g\\u00FBdol\\u00F4'", "'g\\u00FBso'", 
                            "'g\\u00FBnokol'", "'g\\u00FBm\\u00EE'", "'g\\u00FBwolo'", 
                            "'g\\u00FBfox\\u00EA'", "'g\\u00FBf\\u00EE\\u00F4'", 
                            "'g\\u00FBl\\u00FB'", "'to\\u00FB'", "'g\\u00FBlob\\u00EE'", 
                            "'totsi'", "'to\\u00FByen'", "'tohil\\u00F4k'", 
                            "'tosw\\u00EEl'", "'toliyo'", "'tow\\u00EA'", 
                            "'tonbokcut'", "'tol\\u00EAn'", "'tol\\u00EEko'", 
                            "'tolx\\u00EAto'", "'t\\u00F4'", "'t\\u00F4c\\u00EEt'", 
                            "'t\\u00F4nco\\u00EE'", "'t\\u00F4m\\u00F4s'", 
                            "'t\\u00F4lk\\u00EE'", "'t\\u00F4x\\u00FBtsi'", 
                            "'tenk\\u00EEn'", "'tet\\u00EAk'", "'tigoyo'", 
                            "'tel\\u00F4'", "'tif\\u00FBlci'", "'t\\u00F4nk\\u00F4'", 
                            "'t\\u00EE\\u00FB'", "'til'", "'t\\u00EEk\\u00FB'", 
                            "'tukwos'", "'t\\u00EEk\\u00EAl'", "'t\\u00EEx\\u00F4'", 
                            "'tub\\u00F4'", "'t\\u00EEton'", "'t\\u00EEm\\u00EEok'", 
                            "'tuluti'", "'t\\u00FBek'", "'tulkolyun'", "'t\\u00FBt'", 
                            "'t\\u00FBnd\\u00FB'", "'t\\u00FBu'", "'t\\u00FBlokon'", 
                            "'t\\u00FBl\\u00F4no'", "'cok'", "'comen'", 
                            "'cokwoli'", "'cokyen'", "'con\\u00F4\\u00EE'", 
                            "'cosn\\u00EE'", "'conw\\u00EAbo'", "'colot'", 
                            "'c\\u00F4\\u00FBfon'", "'conzodo'", "'c\\u00F4t'", 
                            "'c\\u00F4\\u00FBnton'", "'c\\u00F4cko'", "'c\\u00F4m\\u00EAl'", 
                            "'c\\u00F4nk\\u00F4k'", "'centik'", "'c\\u00EA\\u00F4'", 
                            "'cenc\\u00EE'", "'c\\u00EAnb\\u00F4'", "'c\\u00EAn'", 
                            "'cix\\u00EEn'", "'cih\\u00F4\\u00FB'", "'cif\\u00FB'", 
                            "'ciz\\u00EE'", "'cifulo'", "'cino'", "'cing\\u00EE'", 
                            "'cin\\u00F4bu'", "'ciw\\u00EEnd\\u00EE'", "'c\\u00EEes'", 
                            "'c\\u00EE'", "'c\\u00EEenx\\u00EEn'", "'c\\u00EEhun'", 
                            "'c\\u00EEk\\u00EEn\\u00EEl'", "'c\\u00EEbon'", 
                            "'c\\u00EEg\\u00EElsu'", "'c\\u00EEts\\u00EA'", 
                            "'c\\u00EEnzon'", "'c\\u00EEnl\\u00EE'", "'cusk\\u00EEd\\u00F4'", 
                            "'cukto'", "'cunl\\u00EE\\u00FB'", "'cunc\\u00EEon'", 
                            "'c\\u00FBonwun'", "'cuny\\u00FB'", "'cutn\\u00EA'", 
                            "'culono'", "'c\\u00FBt\\u00EE'", "'c\\u00FB\\u00EE'", 
                            "'c\\u00FBb\\u00FB'", "'c\\u00FBx\\u00EEen'", 
                            "'c\\u00FBdo'", "'c\\u00FBfo'", "'c\\u00FBnf\\u00FB'", 
                            "'c\\u00FBngo'", "'c\\u00FBnd\\u00F4l'", "'c\\u00FBlosun'", 
                            "'sokof\\u00FB'", "'soho\\u00FB'", "'sokol'", 
                            "'c\\u00FBlc\\u00EE'", "'sotn\\u00EEn'", "'c\\u00FBl\\u00FBl'", 
                            "'soden'", "'sodolun'", "'socok'", "'sodil\\u00FB'", 
                            "'sob\\u00F4l\\u00EA'", "'sob\\u00FBn\\u00EE'", 
                            "'sobis'", "'sonkon'", "'somo'", "'sof\\u00EEn'", 
                            "'sont\\u00EE'", "'sol\\u00EElo'", "'solw\\u00F4c'", 
                            "'s\\u00F4t\\u00FBn'", "'s\\u00F4ns\\u00FBs'", 
                            "'s\\u00F4ho\\u00FBk'", "'s\\u00F4bo'", "'s\\u00F4l\\u00FB'", 
                            "'ses'", "'s\\u00F4ndon\\u00F4s'", "'s\\u00F4lt\\u00FBstik'", 
                            "'senwic'", "'s\\u00EAk\\u00EE'", "'sel\\u00F4h\\u00F4'", 
                            "'s\\u00EAdu'", "'s\\u00EAmoi'", "'s\\u00EAk\\u00EEton'", 
                            "'s\\u00EAlb\\u00F4'", "'siskin'", "'s\\u00EAnz\\u00F4'", 
                            "'s\\u00EAl'", "'sityo'", "'s\\u00EE'", "'s\\u00EEokb\\u00EE'", 
                            "'s\\u00EE\\u00EAt\\u00F4'", "'sins\\u00EE'", 
                            "'s\\u00EEkot'", "'s\\u00EE\\u00FBfo'", "'s\\u00EEn\\u00EAx\\u00EEs'", 
                            "'s\\u00EEntokmo'", "'s\\u00EEk\\u00EEn'", "'suhot'", 
                            "'sukyunik'", "'sufo\\u00FBn'", "'sumon'", "'sund\\u00EEbot'", 
                            "'sunb\\u00FBlno'", "'sunyotn\\u00EE'", "'s\\u00FB\\u00EEt'", 
                            "'s\\u00FBt\\u00FB\\u00F4'", "'s\\u00FB\\u00F4xic'", 
                            "'s\\u00FBs\\u00F4n'", "'xo\\u00EEnbo'", "'s\\u00FBb\\u00F4l'", 
                            "'xohofec'", "'s\\u00FBnb\\u00EEd\\u00FB'", 
                            "'s\\u00FBko'", "'s\\u00FBn'", "'xof\\u00F4'", 
                            "'xok\\u00FBl\\u00FB'", "'xobo'", "'xont\\u00FBn'", 
                            "'xob\\u00EAk'", "'xok\\u00F4n'", "'xonluk'", 
                            "'x\\u00F4bo\\u00EE'", "'x\\u00F4m\\u00FBtl\\u00F4'", 
                            "'xe'", "'xowos\\u00EA'", "'xolu'", "'xec\\u00EEnoc'", 
                            "'xolx\\u00EEl\\u00EE'", "'xem\\u00EAtsen'", 
                            "'x\\u00F4n'", "'x\\u00EAt\\u00EE'", "'xef\\u00EEzec'", 
                            "'xing\\u00F4'", "'xifon'", "'x\\u00EAnt\\u00EEl'", 
                            "'x\\u00EE\\u00FBf\\u00FB'", "'x\\u00EE\\u00FBlo'", 
                            "'x\\u00EEk\\u00F4'", "'x\\u00EEd\\u00EAtl\\u00EE'", 
                            "'x\\u00EExulko'", "'x\\u00EEs\\u00FB'", "'x\\u00EEmol'", 
                            "'x\\u00EEnc\\u00FBon'", "'x\\u00EEmu'", "'xulmindo'", 
                            "'x\\u00EEwon'", "'x\\u00EEy\\u00F4c\\u00FB'", 
                            "'x\\u00FBto'", "'x\\u00FBk'", "'x\\u00FBsten'", 
                            "'do\\u00EE'", "'x\\u00FBnyu'", "'x\\u00FBxok'", 
                            "'do\\u00EEnb\\u00EE'", "'doho'", "'doh\\u00EEl'", 
                            "'do\\u00EEc\\u00EAl'", "'dokdogo'", "'dod\\u00F4\\u00FB'", 
                            "'dokn\\u00FB'", "'dondun'", "'d\\u00F4kcon'", 
                            "'d\\u00F4n\\u00FBs'", "'dod\\u00EA'", "'d\\u00F4cu\\u00EE'", 
                            "'d\\u00F4stoc'", "'d\\u00F4n\\u00FBxin'", "'deku'", 
                            "'d\\u00EAko'", "'d\\u00EAs'", "'d\\u00EAn'", 
                            "'d\\u00EE'", "'dibo'", "'d\\u00EEzel'", "'d\\u00EAto\\u00EE'", 
                            "'d\\u00EAn\\u00EAm\\u00EAk'", "'d\\u00EEnc\\u00EE'", 
                            "'d\\u00EEd\\u00F4z\\u00FB'", "'d\\u00EEnzo\\u00FB'", 
                            "'d\\u00EEyond\\u00EA'", "'du\\u00FBhon'", "'d\\u00EEl\\u00EA'", 
                            "'dus'", "'dukw\\u00EAlit'", "'dumoko'", "'duw\\u00F4n\\u00EE'", 
                            "'d\\u00FB\\u00EE'", "'d\\u00FBunc\\u00EEt'", 
                            "'d\\u00FBsul'", "'d\\u00FBbono'", "'d\\u00FBstu'", 
                            "'d\\u00FBngo'", "'d\\u00FBndon'", "'zoso'", 
                            "'zomo'", "'zoston'", "'zom\\u00EE'", "'zon\\u00FBb\\u00EE'", 
                            "'zom\\u00FBn\\u00EE'", "'zonwul'", "'zowo'", 
                            "'zoh\\u00EEt'", "'z\\u00F4\\u00EE'", "'zolon\\u00EE'", 
                            "'z\\u00F4h\\u00FBn'", "'zol\\u00EE'", "'z\\u00F4goc'", 
                            "'z\\u00F4t\\u00EAst\\u00F4'", "'ze'", "'zelen'", 
                            "'z\\u00EAns\\u00EE'", "'z\\u00EAsto'", "'zik'", 
                            "'zizime'", "'ziy\\u00F4n'", "'z\\u00EEg\\u00EEl'", 
                            "'zinkon'", "'z\\u00EEco\\u00FB'", "'z\\u00EEx\\u00EEt\\u00FB'", 
                            "'z\\u00EEngu'", "'z\\u00EEz\\u00EEyo'", "'z\\u00EEwit'", 
                            "'zuko'", "'zusbot'", "'zuwob\\u00FB'", "'z\\u00EElyo\\u00EEs'", 
                            "'z\\u00FBng\\u00F4'", "'z\\u00FBt\\u00F4'", 
                            "'z\\u00FBnt\\u00FBlu'", "'z\\u00FBhu'", "'z\\u00FByi'", 
                            "'bo\\u00EEf\\u00F4n'", "'z\\u00FBnlo'", "'boit'", 
                            "'boholon'", "'bog\\u00F4'", "'botuk'", "'bod\\u00EE'", 
                            "'bostof\\u00EEs'", "'box\\u00F4'", "'bob\\u00F4un'", 
                            "'bono'", "'botyoto'", "'bon\\u00F4xo'", "'bol\\u00EEmot'", 
                            "'bong\\u00F4s\\u00EE'", "'bole'", "'boyok'", 
                            "'bomoge'", "'b\\u00F4k\\u00F4foc'", "'bolce'", 
                            "'b\\u00F4kl\\u00F4n'", "'b\\u00F4sol'", "'b\\u00F4nti'", 
                            "'b\\u00F4kb\\u00FBn'", "'bolut\\u00EA'", "'b\\u00F4lf\\u00EAl\\u00EA'", 
                            "'bet\\u00EEdo'", "'bel\\u00EEs\\u00EEs'", "'besol'", 
                            "'bel\\u00EAxu'", "'b\\u00EA\\u00FBdo'", "'b\\u00EA\\u00EEku'", 
                            "'b\\u00EAsu'", "'b\\u00EAl\\u00EAt\\u00EA'", 
                            "'b\\u00EAsn\\u00EAhot'", "'bind\\u00FB'", "'bi'", 
                            "'binl\\u00EA\\u00F4'", "'bit\\u00FBn'", "'b\\u00EEol\\u00EE'", 
                            "'bil\\u00EEt'", "'b\\u00EEkont\\u00EA'", "'b\\u00EE\\u00F4mu'", 
                            "'b\\u00EEc\\u00FBon'", "'b\\u00EEek'", "'b\\u00EEt'", 
                            "'b\\u00EEs\\u00FB'", "'b\\u00EEn\\u00EA'", 
                            "'b\\u00EEb\\u00F4k'", "'b\\u00EEnh\\u00FBn'", 
                            "'b\\u00EEnton'", "'buk\\u00FB'", "'bucono'", 
                            "'busw\\u00EAlin'", "'buswen'", "'bunxin'", 
                            "'buyencok'", "'bundu'", "'b\\u00FBgot'", "'b\\u00FB\\u00EEh\\u00EE'", 
                            "'b\\u00FBsin'", "'b\\u00FBsl\\u00FB'", "'b\\u00FBdogo'", 
                            "'b\\u00FBd\\u00EEk\\u00F4'", "'b\\u00FBz\\u00F4k'", 
                            "'b\\u00FBm\\u00EE'", "'b\\u00FBnt\\u00FBt'", 
                            "'b\\u00FBnd\\u00FBk\\u00EE'", "'fo\\u00FBt'", 
                            "'b\\u00FBlo'", "'fohoso'", "'b\\u00FBl\\u00FBs\\u00EE'", 
                            "'fos'", "'b\\u00EAmon'", "'b\\u00EEl\\u00FBs'", 
                            "'but'", "'fonolon'", "'foxo'", "'fonmot'", 
                            "'fonx\\u00EEn'", "'folo'", "'foko'", "'f\\u00F4hon'", 
                            "'f\\u00F4g\\u00EEc\\u00EEn'", "'f\\u00F4doloc'", 
                            "'f\\u00F4ln\\u00EE'", "'fonf\\u00FBk'", "'f\\u00F4lun'", 
                            "'fecko'", "'fikwun'", "'f\\u00EAlkon\\u00F4'", 
                            "'f\\u00EAlc\\u00EEn'", "'fen\\u00FBo'", "'fildonbun'", 
                            "'f\\u00EEectu'", "'fisun'", "'f\\u00EEt\\u00EEk\\u00F4s'", 
                            "'fiy\\u00FBx\\u00EEt'", "'f\\u00EEm\\u00F4sy\\u00F4s'", 
                            "'f\\u00EEcwo'", "'f\\u00EElo'", "'f\\u00EEz\\u00EE'", 
                            "'fu\\u00EE'", "'f\\u00EEy\\u00EAn'", "'fun'", 
                            "'funs\\u00FBt'", "'fulk\\u00F4\\u00EE'", "'funl\\u00EEt'", 
                            "'f\\u00FBts\\u00FBn'", "'f\\u00FBongok'", "'f\\u00FBk\\u00FBxi'", 
                            "'f\\u00FBus'", "'f\\u00FBx\\u00FBb\\u00EEn'", 
                            "'f\\u00FBnb\\u00EAtsi'", "'f\\u00FBnl\\u00F4k'", 
                            "'f\\u00EEk\\u00EE'", "'mokon'", "'f\\u00FBnb\\u00F4'", 
                            "'mot\\u00FBo'", "'mosk\\u00FBl'", "'mocko'", 
                            "'mozulis'", "'moz\\u00EEk\\u00F4'", "'motsi'", 
                            "'moz\\u00FBn'", "'monodo'", "'momok\\u00EE'", 
                            "'moxo'", "'mont\\u00FBksol'", "'mong\\u00F4'", 
                            "'m\\u00F4\\u00EE'", "'m\\u00F4k\\u00F4fo'", 
                            "'m\\u00F4t\\u00F4'", "'m\\u00F4kwon'", "'m\\u00F4towo'", 
                            "'m\\u00F4t\\u00EEf\\u00F4'", "'m\\u00F4c\\u00EEbo'", 
                            "'m\\u00F4tsil\\u00EA'", "'m\\u00F4f\\u00EE'", 
                            "'m\\u00F4n\\u00EEso'", "'mef\\u00FBs'", "'m\\u00EAtl\\u00EE\\u00F4s'", 
                            "'m\\u00EAd\\u00FBson'", "'m\\u00F4nbili'", 
                            "'m\\u00EAny\\u00FBu'", "'m\\u00EAn\\u00FBs'", 
                            "'mixofo'", "'m\\u00EAloc'", "'misli'", "'minyoto'", 
                            "'miny\\u00F4'", "'m\\u00EEo\\u00FB'", "'m\\u00EEkdol'", 
                            "'m\\u00EE\\u00EAbil'", "'m\\u00EEtet\\u00EAn'", 
                            "'m\\u00EEtmo'", "'m\\u00EEc\\u00EEn'", "'m\\u00EEencok'", 
                            "'m\\u00EEle'", "'m\\u00EEh\\u00FBon'", "'mu\\u00EEl\\u00F4'", 
                            "'m\\u00EEstu'", "'mun\\u00EE'", "'munyufo'", 
                            "'mutyu'", "'m\\u00FBun'", "'m\\u00FB\\u00EAs\\u00EE'", 
                            "'m\\u00FBk\\u00F4nun'", "'m\\u00FBt'", "'m\\u00FBhoyon'", 
                            "'m\\u00FBkno'", "'m\\u00FBstok\\u00EEn'", "'m\\u00FBx\\u00EE'", 
                            "'m\\u00FBf\\u00EA\\u00FB'", "'no\\u00EE'", 
                            "'no\\u00F4'", "'m\\u00FBl\\u00FB'", "'nokdo'", 
                            "'m\\u00FBnc\\u00FB'", "'m\\u00FBncot\\u00EE'", 
                            "'no\\u00FBku'", "'noc\\u00EEdo'", "'noz\\u00EE'", 
                            "'non'", "'nom\\u00FB'", "'nos\\u00F4'", "'nonk\\u00FB'", 
                            "'nodu'", "'noyo'", "'nonto'", "'ne\\u00EEgin'", 
                            "'n\\u00F4'", "'n\\u00F4kso'", "'n\\u00F4\\u00EElu'", 
                            "'nec'", "'nex\\u00EA'", "'nebu'", "'nendol'", 
                            "'n\\u00EAx\\u00F4d\\u00EE'", "'n\\u00EA\\u00F4s'", 
                            "'n\\u00EAl\\u00F4'", "'ni'", "'n\\u00EAnko'", 
                            "'nicu'", "'nikf\\u00FBl'", "'nisw\\u00EE'", 
                            "'niwos'", "'nix\\u00EEn'", "'nilol'", "'n\\u00EEo'", 
                            "'n\\u00EE\\u00F4k'", "'n\\u00EEecni'", "'n\\u00EEm\\u00FB'", 
                            "'nubuso'", "'nucoto'", "'nukul\\u00F4'", "'n\\u00EElt\\u00FBgu'", 
                            "'nungo'", "'num\\u00FBno'", "'nulto'", "'nul\\u00FBhu'", 
                            "'woh\\u00EE'", "'n\\u00FByo'", "'wok\\u00FBt'", 
                            "'n\\u00FBs'", "'nulun'", "'wod\\u00EEno'", 
                            "'wokto'", "'wofok'", "'wonk\\u00FBk'", "'wob\\u00EE'", 
                            "'woy\\u00FB'", "'woloko'", "'wedo'", "'wowo\\u00EA'", 
                            "'w\\u00EA\\u00EElun'", "'welt\\u00F4'", "'w\\u00F4lik'", 
                            "'w\\u00EAko'", "'w\\u00EAtod\\u00FB'", "'w\\u00EAk\\u00EAso'", 
                            "'w\\u00EAx\\u00F4n'", "'wikse'", "'win\\u00EEt'", 
                            "'w\\u00EAt\\u00FB'", "'wixon\\u00FB'", "'w\\u00EEx\\u00EAs'", 
                            "'w\\u00EEbolo'", "'w\\u00EEl\\u00EE'", "'w\\u00EAloi'", 
                            "'wu\\u00EEts\\u00EE'", "'wuktom\\u00FB'", "'wuto'", 
                            "'wutun'", "'w\\u00EEk'", "'w\\u00EEl\\u00FBwo'", 
                            "'wulus'", "'w\\u00FB\\u00F4t'", "'losol'", 
                            "'lohot'", "'loz\\u00EEd\\u00F4'", "'lobot\\u00F4l'", 
                            "'longi'", "'loz\\u00F4'", "'lon'", "'l\\u00F4\\u00EEc\\u00F4k'", 
                            "'lono'", "'l\\u00F4tfen'", "'lol\\u00FB'", 
                            "'londuluk'", "'l\\u00F4z\\u00EEc'", "'l\\u00F4c'", 
                            "'l\\u00F4nkin'", "'leknek'", "'lexetko'", "'leg\\u00EAf\\u00FB'", 
                            "'l\\u00EAf\\u00F4tol'", "'l\\u00EEonx\\u00EEn'", 
                            "'l\\u00EAkin'", "'l\\u00EEun'", "'l\\u00EE\\u00FBb\\u00EEt'", 
                            "'li'", "'l\\u00EE\\u00FBl\\u00EA'", "'l\\u00EEs'", 
                            "'l\\u00EEt\\u00F4'", "'l\\u00EEb\\u00FB'", 
                            "'l\\u00EEtiwe'", "'l\\u00EEsto'", "'luh\\u00FB'", 
                            "'l\\u00EEm\\u00EEen'", "'lufono'", "'l\\u00EEsmu'", 
                            "'l\\u00FB\\u00EEc\\u00FB'", "'lunsol'", "'l\\u00FBok'", 
                            "'l\\u00FBko'", "'l\\u00FBcik'", "'l\\u00FBcku'", 
                            "'yo\\u00FBmok'", "'yo\\u00FBt\\u00EE'", "'yok\\u00FBnt\\u00EEk'", 
                            "'l\\u00FBnt\\u00EE'", "'yosk\\u00EEnyo'", "'yog\\u00F4'", 
                            "'yosten'", "'yob\\u00EA'", "'yodo'", "'yof\\u00FBk'", 
                            "'y\\u00F4\\u00FBl\\u00EE'", "'yold\\u00FBn'", 
                            "'yonl\\u00FBs'", "'y\\u00F4\\u00FBx\\u00EEn'", 
                            "'y\\u00F4k'", "'y\\u00F4cno'", "'y\\u00F4n'", 
                            "'y\\u00EA'", "'y\\u00F4n\\u00EA'", "'yiny\\u00FBnc\\u00EE'", 
                            "'yins\\u00FBk'", "'yumon'", "'yund\\u00F4\\u00FB'", 
                            "'y\\u00FBkwo\\u00EE'", "'y\\u00FBnl\\u00F4n'" ];
    static symbolicNames = [ null, "WS", "Oiyo", "ProperNoun", "Comma", 
                             "Colon", "Period", "QuestionStart", "QuestionEnd", 
                             "QuotationStart", "QuotationEnd", "Outo", "Okulo", 
                             "Oudi", "Okot", "Oksios", "Oklumun", "Oksun", 
                             "Ogolol", "Ogoge", "Ocuo", "Otos", "Okoxu", 
                             "Ostok", "Odigon", "Osyen", "Ozuul", "Oboki", 
                             "Obo", "Obunyun", "Obulu", "Ofek", "Ofine", 
                             "Omulto", "Onkuol", "Ono", "Onkonu", "Oncemon", 
                             "Ondo", "Ongolo", "Ohel", "Oitun", "Onwoni", 
                             "Otsotot", "Onfibi", "Osole", "Oltu", "Osti", 
                             "Oldis", "Ofo", "Ozil", "Odon", "Obok", "Oni", 
                             "Et", "Eson", "Onton", "Onsu", "Eswen", "Ole", 
                             "Eloi", "En", "Eleke", "Eo", "Etso", "Elentet", 
                             "Elfu", "Ebol", "Eme", "Efun", "Itihos", "Enbukun", 
                             "Enkomon", "Eleo", "Isbulyol", "Eto", "Iciwu", 
                             "Icwon", "Istihol", "Iwote", "Isenso", "Infultin", 
                             "Isbonxu", "Isko", "Ixolo", "Imon", "Ibudu", 
                             "Isibo", "Ibuwe", "Ilik", "In", "Ibole", "Uklo", 
                             "Usundul", "Inboli", "Uskifo", "Ubolni", "Ile", 
                             "Ilxizuk", "Umo", "Ubenus", "Ufulit", "Undofol", 
                             "Unbol", "Uyo", "Ulyo", "Unon", "U", "Unbu", 
                             "Usen", "Ucumi", "Usowo", "Utok", "Umomi", 
                             "Usmon", "Uslek", "Unidu", "Un", "Unhilun", 
                             "Uncoi", "Ulkefi", "Ulgukin", "Ulonfu", "Ulogun", 
                             "Unfuno", "Hokiki", "Ulzo", "Hoi", "Hokoli", 
                             "Hokuxi", "Hosoun", "Hoxobe", "Hobiyo", "Homus", 
                             "Hondon", "Hoos", "Hosin", "Hondot", "Hofo", 
                             "Hoktun", "Hofezi", "Hon", "Honcou", "Holuk", 
                             "Holmo", "Hodoku", "Hefin", "Henonde", "Honyo", 
                             "Helgo", "Helxun", "Henelo", "Hitsu", "Hitnodet", 
                             "Hismo", "Hizon", "Hunzidu", "Huluko", "Huunhu", 
                             "Huke", "Hukun", "Husku", "Hustun", "Hudul", 
                             "Hunsik", "Huzon", "Hunsuon", "Hiyoli", "Huwuncul", 
                             "Huwu", "Hiskunco", "Hiklihos", "Hulodek", 
                             "Hulu", "Kocko", "Kon", "Kotilmok", "Kobut", 
                             "Kotonhon", "Konxo", "Ko", "Kontol", "Koi", 
                             "Konbokbo", "Konwo", "Koto", "Kolowu", "Kokoku", 
                             "Kos", "Koson", "Kotfusu", "Koxente", "Kotikol", 
                             "Konen", "Komu", "Kodus", "Kondodu", "Kontesto", 
                             "Kondonse", "Kolmudul", "Kosmo", "Konyec", 
                             "Konbo", "Kelo", "Ke", "Keskin", "Kexik", "Kelos", 
                             "Kiungo", "Kistose", "Kikolo", "Kioso", "Kiluku", 
                             "Kisko", "Kinoxi", "Kino", "Kiso", "Kinse", 
                             "Kuunme", "Kinyosel", "Kinlik", "Kildo", "Kiyo", 
                             "Kut", "Kutin", "Kududo", "Kukwon", "Kuon", 
                             "Kuocyo", "Kuu", "Kuonlon", "Kukmut", "Kusowi", 
                             "Kunonti", "Kuzou", "Kudu", "Kumun", "Kuoxi", 
                             "Kunhiun", "Kuncien", "Kungiyo", "Kunbi", "Kuldu", 
                             "Gosil", "Gos", "Kulunun", "Gomi", "Kuyo", 
                             "Goniso", "Gonbu", "Gonzil", "Gongoxi", "Golo", 
                             "Golfon", "Golbinus", "Golun", "Go", "Gocidon", 
                             "Gonyumon", "Gowo", "Goyu", "Gemolen", "Goluo", 
                             "Gelmis", "Gitno", "Geko", "Gion", "Gik", "Gito", 
                             "Gubuyo", "Gisgul", "Gufis", "Gueyu", "Guexo", 
                             "Gundole", "Gudolo", "Guso", "Gunokol", "Gumi", 
                             "Guwolo", "Gufoxe", "Gufio", "Gulu", "Tou", 
                             "Gulobi", "Totsi", "Touyen", "Tohilok", "Toswil", 
                             "Toliyo", "Towe", "Tonbokcut", "Tolen", "Toliko", 
                             "Tolxeto", "To", "Tocit", "Toncoi", "Tomos", 
                             "Tolki", "Toxutsi", "Tenkin", "Tetek", "Tigoyo", 
                             "Telo", "Tifulci", "Tonko", "Tiu", "Til", "Tiku", 
                             "Tukwos", "Tikel", "Tixo", "Tubo", "Titon", 
                             "Timiok", "Tuluti", "Tuek", "Tulkolyun", "Tut", 
                             "Tundu", "Tuu", "Tulokon", "Tulono", "Cok", 
                             "Comen", "Cokwoli", "Cokyen", "Conoi", "Cosni", 
                             "Conwebo", "Colot", "Coufon", "Conzodo", "Cot", 
                             "Counton", "Cocko", "Comel", "Conkok", "Centik", 
                             "Ceo", "Cenci", "Cenbo", "Cen", "Cixin", "Cihou", 
                             "Cifu", "Cizi", "Cifulo", "Cino", "Cingi", 
                             "Cinobu", "Ciwindi", "Cies", "Ci", "Cienxin", 
                             "Cihun", "Cikinil", "Cibon", "Cigilsu", "Citse", 
                             "Cinzon", "Cinli", "Cuskido", "Cukto", "Cunliu", 
                             "Cuncion", "Cuonwun", "Cunyu", "Cutne", "Culono", 
                             "Cuti", "Cui", "Cubu", "Cuxien", "Cudo", "Cufo", 
                             "Cunfu", "Cungo", "Cundol", "Culosun", "Sokofu", 
                             "Sohou", "Sokol", "Culci", "Sotnin", "Culul", 
                             "Soden", "Sodolun", "Socok", "Sodilu", "Sobole", 
                             "Sobuni", "Sobis", "Sonkon", "Somo", "Sofin", 
                             "Sonti", "Solilo", "Solwoc", "Sotun", "Sonsus", 
                             "Sohouk", "Sobo", "Solu", "Ses", "Sondonos", 
                             "Soltustik", "Senwic", "Seki", "Seloho", "Sedu", 
                             "Semoi", "Sekiton", "Selbo", "Siskin", "Senzo", 
                             "Sel", "Sityo", "Si", "Siokbi", "Sieto", "Sinsi", 
                             "Sikot", "Siufo", "Sinexis", "Sintokmo", "Sikin", 
                             "Suhot", "Sukyunik", "Sufoun", "Sumon", "Sundibot", 
                             "Sunbulno", "Sunyotni", "Suit", "Sutuo", "Suoxic", 
                             "Suson", "Xoinbo", "Subol", "Xohofec", "Sunbidu", 
                             "Suko", "Sun", "Xofo", "Xokulu", "Xobo", "Xontun", 
                             "Xobek", "Xokon", "Xonluk", "Xoboi", "Xomutlo", 
                             "Xe", "Xowose", "Xolu", "Xecinoc", "Xolxili", 
                             "Xemetsen", "Xon", "Xeti", "Xefizec", "Xingo", 
                             "Xifon", "Xentil", "Xiufu", "Xiulo", "Xiko", 
                             "Xidetli", "Xixulko", "Xisu", "Ximol", "Xincuon", 
                             "Ximu", "Xulmindo", "Xiwon", "Xiyocu", "Xuto", 
                             "Xuk", "Xusten", "Doi", "Xunyu", "Xuxok", "Doinbi", 
                             "Doho", "Dohil", "Doicel", "Dokdogo", "Dodou", 
                             "Doknu", "Dondun", "Dokcon", "Donus", "Dode", 
                             "Docui", "Dostoc", "Donuxin", "Deku", "Deko", 
                             "Des", "Den", "Di", "Dibo", "Dizel", "Detoi", 
                             "Denemek", "Dinci", "Didozu", "Dinzou", "Diyonde", 
                             "Duuhon", "Dile", "Dus", "Dukwelit", "Dumoko", 
                             "Duwoni", "Dui", "Duuncit", "Dusul", "Dubono", 
                             "Dustu", "Dungo", "Dundon", "Zoso", "Zomo", 
                             "Zoston", "Zomi", "Zonubi", "Zomuni", "Zonwul", 
                             "Zowo", "Zohit", "Zoi", "Zoloni", "Zohun", 
                             "Zoli", "Zogoc", "Zotesto", "Ze", "Zelen", 
                             "Zensi", "Zesto", "Zik", "Zizime", "Ziyon", 
                             "Zigil", "Zinkon", "Zicou", "Zixitu", "Zingu", 
                             "Ziziyo", "Ziwit", "Zuko", "Zusbot", "Zuwobu", 
                             "Zilyois", "Zungo", "Zuto", "Zuntulu", "Zuhu", 
                             "Zuyi", "Boifon", "Zunlo", "Boit", "Boholon", 
                             "Bogo", "Botuk", "Bodi", "Bostofis", "Boxo", 
                             "Boboun", "Bono", "Botyoto", "Bonoxo", "Bolimot", 
                             "Bongosi", "Bole", "Boyok", "Bomoge", "Bokofoc", 
                             "Bolce", "Boklon", "Bosol", "Bonti", "Bokbun", 
                             "Bolute", "Bolfele", "Betido", "Belisis", "Besol", 
                             "Belexu", "Beudo", "Beiku", "Besu", "Belete", 
                             "Besnehot", "Bindu", "Bi", "Binleo", "Bitun", 
                             "Bioli", "Bilit", "Bikonte", "Biomu", "Bicuon", 
                             "Biek", "Bit", "Bisu", "Bine", "Bibok", "Binhun", 
                             "Binton", "Buku", "Bucono", "Buswelin", "Buswen", 
                             "Bunxin", "Buyencok", "Bundu", "Bugot", "Buihi", 
                             "Busin", "Buslu", "Budogo", "Budiko", "Buzok", 
                             "Bumi", "Buntut", "Bunduki", "Fout", "Bulo", 
                             "Fohoso", "Bulusi", "Fos", "Bemon", "Bilus", 
                             "But", "Fonolon", "Foxo", "Fonmot", "Fonxin", 
                             "Folo", "Foko", "Fohon", "Fogicin", "Fodoloc", 
                             "Folni", "Fonfuk", "Folun", "Fecko", "Fikwun", 
                             "Felkono", "Felcin", "Fenuo", "Fildonbun", 
                             "Fiectu", "Fisun", "Fitikos", "Fiyuxit", "Fimosyos", 
                             "Ficwo", "Filo", "Fizi", "Fui", "Fiyen", "Fun", 
                             "Funsut", "Fulkoi", "Funlit", "Futsun", "Fuongok", 
                             "Fukuxi", "Fuus", "Fuxubin", "Funbetsi", "Funlok", 
                             "Fiki", "Mokon", "Funbo", "Motuo", "Moskul", 
                             "Mocko", "Mozulis", "Moziko", "Motsi", "Mozun", 
                             "Monodo", "Momoki", "Moxo", "Montuksol", "Mongo", 
                             "Moi", "Mokofo", "Moto", "Mokwon", "Motowo", 
                             "Motifo", "Mocibo", "Motsile", "Mofi", "Moniso", 
                             "Mefus", "Metlios", "Meduson", "Monbili", "Menyuu", 
                             "Menus", "Mixofo", "Meloc", "Misli", "Minyoto", 
                             "Minyo", "Miou", "Mikdol", "Miebil", "Miteten", 
                             "Mitmo", "Micin", "Miencok", "Mile", "Mihuon", 
                             "Muilo", "Mistu", "Muni", "Munyufo", "Mutyu", 
                             "Muun", "Muesi", "Mukonun", "Mut", "Muhoyon", 
                             "Mukno", "Mustokin", "Muxi", "Mufeu", "Noi", 
                             "Noo", "Mulu", "Nokdo", "Muncu", "Muncoti", 
                             "Nouku", "Nocido", "Nozi", "Non", "Nomu", "Noso", 
                             "Nonku", "Nodu", "Noyo", "Nonto", "Neigin", 
                             "No", "Nokso", "Noilu", "Nec", "Nexe", "Nebu", 
                             "Nendol", "Nexodi", "Neos", "Nelo", "Ni", "Nenko", 
                             "Nicu", "Nikful", "Niswi", "Niwos", "Nixin", 
                             "Nilol", "Nio", "Niok", "Niecni", "Nimu", "Nubuso", 
                             "Nucoto", "Nukulo", "Niltugu", "Nungo", "Numuno", 
                             "Nulto", "Nuluhu", "Wohi", "Nuyo", "Wokut", 
                             "Nus", "Nulun", "Wodino", "Wokto", "Wofok", 
                             "Wonkuk", "Wobi", "Woyu", "Woloko", "Wedo", 
                             "Wowoe", "Weilun", "Welto", "Wolik", "Weko", 
                             "Wetodu", "Wekeso", "Wexon", "Wikse", "Winit", 
                             "Wetu", "Wixonu", "Wixes", "Wibolo", "Wili", 
                             "Weloi", "Wuitsi", "Wuktomu", "Wuto", "Wutun", 
                             "Wik", "Wiluwo", "Wulus", "Wuot", "Losol", 
                             "Lohot", "Lozido", "Lobotol", "Longi", "Lozo", 
                             "Lon", "Loicok", "Lono", "Lotfen", "Lolu", 
                             "Londuluk", "Lozic", "Loc", "Lonkin", "Leknek", 
                             "Lexetko", "Legefu", "Lefotol", "Lionxin", 
                             "Lekin", "Liun", "Liubit", "Li", "Liule", "Lis", 
                             "Lito", "Libu", "Litiwe", "Listo", "Luhu", 
                             "Limien", "Lufono", "Lismu", "Luicu", "Lunsol", 
                             "Luok", "Luko", "Lucik", "Lucku", "Youmok", 
                             "Youti", "Yokuntik", "Lunti", "Yoskinyo", "Yogo", 
                             "Yosten", "Yobe", "Yodo", "Yofuk", "Youli", 
                             "Yoldun", "Yonlus", "Youxin", "Yok", "Yocno", 
                             "Yon", "Ye", "Yone", "Yinyunci", "Yinsuk", 
                             "Yumon", "Yundou", "Yukwoi", "Yunlon" ];
    static ruleNames = [ "postposition", "pronoun", "rawVerbs", "rawNouns", 
                         "rawModifiers", "connector" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = HisyeoWordParser.ruleNames;
        this.literalNames = HisyeoWordParser.literalNames;
        this.symbolicNames = HisyeoWordParser.symbolicNames;
    }



	postposition() {
	    let localctx = new PostpositionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, HisyeoWordParser.RULE_postposition);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 12;
	        _la = this._input.LA(1);
	        if(!(_la===180 || _la===354 || _la===539 || _la===639 || _la===827 || _la===829)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	pronoun() {
	    let localctx = new PronounContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, HisyeoWordParser.RULE_pronoun);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 14;
	        _la = this._input.LA(1);
	        if(!(((((_la - 26)) & ~0x1f) === 0 && ((1 << (_la - 26)) & 8389121) !== 0) || _la===105 || _la===347 || _la===504 || _la===543 || ((((_la - 750)) & ~0x1f) === 0 && ((1 << (_la - 750)) & 18882561) !== 0) || _la===786)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	rawVerbs() {
	    let localctx = new RawVerbsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, HisyeoWordParser.RULE_rawVerbs);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 16;
	        _la = this._input.LA(1);
	        if(!(((((_la - 11)) & ~0x1f) === 0 && ((1 << (_la - 11)) & 1317535883) !== 0) || ((((_la - 56)) & ~0x1f) === 0 && ((1 << (_la - 56)) & 673185793) !== 0) || ((((_la - 95)) & ~0x1f) === 0 && ((1 << (_la - 95)) & 9439233) !== 0) || ((((_la - 132)) & ~0x1f) === 0 && ((1 << (_la - 132)) & 939679809) !== 0) || ((((_la - 181)) & ~0x1f) === 0 && ((1 << (_la - 181)) & 4293009) !== 0) || ((((_la - 216)) & ~0x1f) === 0 && ((1 << (_la - 216)) & 1073742337) !== 0) || ((((_la - 248)) & ~0x1f) === 0 && ((1 << (_la - 248)) & 2147484305) !== 0) || ((((_la - 281)) & ~0x1f) === 0 && ((1 << (_la - 281)) & 1048737) !== 0) || ((((_la - 316)) & ~0x1f) === 0 && ((1 << (_la - 316)) & 1342259299) !== 0) || ((((_la - 356)) & ~0x1f) === 0 && ((1 << (_la - 356)) & 22570833) !== 0) || ((((_la - 389)) & ~0x1f) === 0 && ((1 << (_la - 389)) & 539000917) !== 0) || ((((_la - 424)) & ~0x1f) === 0 && ((1 << (_la - 424)) & 29892609) !== 0) || ((((_la - 462)) & ~0x1f) === 0 && ((1 << (_la - 462)) & 511983633) !== 0) || ((((_la - 496)) & ~0x1f) === 0 && ((1 << (_la - 496)) & 117490761) !== 0) || ((((_la - 532)) & ~0x1f) === 0 && ((1 << (_la - 532)) & 1686175745) !== 0) || ((((_la - 580)) & ~0x1f) === 0 && ((1 << (_la - 580)) & 67181837) !== 0) || ((((_la - 614)) & ~0x1f) === 0 && ((1 << (_la - 614)) & 2359301) !== 0) || ((((_la - 649)) & ~0x1f) === 0 && ((1 << (_la - 649)) & 1613284609) !== 0) || ((((_la - 685)) & ~0x1f) === 0 && ((1 << (_la - 685)) & 81925) !== 0) || ((((_la - 725)) & ~0x1f) === 0 && ((1 << (_la - 725)) & 327681) !== 0) || ((((_la - 768)) & ~0x1f) === 0 && ((1 << (_la - 768)) & 675283969) !== 0) || ((((_la - 800)) & ~0x1f) === 0 && ((1 << (_la - 800)) & 8394823) !== 0) || ((((_la - 832)) & ~0x1f) === 0 && ((1 << (_la - 832)) & 9438721) !== 0) || ((((_la - 866)) & ~0x1f) === 0 && ((1 << (_la - 866)) & 328705) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	rawNouns() {
	    let localctx = new RawNounsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, HisyeoWordParser.RULE_rawNouns);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 18;
	        _la = this._input.LA(1);
	        if(!(((((_la - 13)) & ~0x1f) === 0 && ((1 << (_la - 13)) & 3959473817) !== 0) || ((((_la - 47)) & ~0x1f) === 0 && ((1 << (_la - 47)) & 2744295433) !== 0) || ((((_la - 80)) & ~0x1f) === 0 && ((1 << (_la - 80)) & 1900693909) !== 0) || ((((_la - 114)) & ~0x1f) === 0 && ((1 << (_la - 114)) & 1980978945) !== 0) || ((((_la - 148)) & ~0x1f) === 0 && ((1 << (_la - 148)) & 58081625) !== 0) || ((((_la - 186)) & ~0x1f) === 0 && ((1 << (_la - 186)) & 685793555) !== 0) || ((((_la - 218)) & ~0x1f) === 0 && ((1 << (_la - 218)) & 2382292739) !== 0) || ((((_la - 251)) & ~0x1f) === 0 && ((1 << (_la - 251)) & 2850963969) !== 0) || ((((_la - 287)) & ~0x1f) === 0 && ((1 << (_la - 287)) & 503359741) !== 0) || ((((_la - 320)) & ~0x1f) === 0 && ((1 << (_la - 320)) & 1620115817) !== 0) || ((((_la - 352)) & ~0x1f) === 0 && ((1 << (_la - 352)) & 672172257) !== 0) || ((((_la - 384)) & ~0x1f) === 0 && ((1 << (_la - 384)) & 3138240527) !== 0) || ((((_la - 417)) & ~0x1f) === 0 && ((1 << (_la - 417)) & 321437297) !== 0) || ((((_la - 453)) & ~0x1f) === 0 && ((1 << (_la - 453)) & 3594144841) !== 0) || ((((_la - 493)) & ~0x1f) === 0 && ((1 << (_la - 493)) & 2193708085) !== 0) || ((((_la - 525)) & ~0x1f) === 0 && ((1 << (_la - 525)) & 894049895) !== 0) || ((((_la - 557)) & ~0x1f) === 0 && ((1 << (_la - 557)) & 1493201741) !== 0) || ((((_la - 593)) & ~0x1f) === 0 && ((1 << (_la - 593)) & 2185758933) !== 0) || ((((_la - 627)) & ~0x1f) === 0 && ((1 << (_la - 627)) & 160090191) !== 0) || ((((_la - 662)) & ~0x1f) === 0 && ((1 << (_la - 662)) & 2704563729) !== 0) || ((((_la - 694)) & ~0x1f) === 0 && ((1 << (_la - 694)) & 1136037901) !== 0) || ((((_la - 726)) & ~0x1f) === 0 && ((1 << (_la - 726)) & 1992100141) !== 0) || ((((_la - 765)) & ~0x1f) === 0 && ((1 << (_la - 765)) & 3105527857) !== 0) || ((((_la - 799)) & ~0x1f) === 0 && ((1 << (_la - 799)) & 2795472177) !== 0) || ((((_la - 834)) & ~0x1f) === 0 && ((1 << (_la - 834)) & 3529220103) !== 0) || ((((_la - 869)) & ~0x1f) === 0 && ((1 << (_la - 869)) & 18005) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	rawModifiers() {
	    let localctx = new RawModifiersContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, HisyeoWordParser.RULE_rawModifiers);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 20;
	        _la = this._input.LA(1);
	        if(!(((((_la - 15)) & ~0x1f) === 0 && ((1 << (_la - 15)) & 3221636177) !== 0) || ((((_la - 51)) & ~0x1f) === 0 && ((1 << (_la - 51)) & 1355169795) !== 0) || ((((_la - 86)) & ~0x1f) === 0 && ((1 << (_la - 86)) & 1308808385) !== 0) || ((((_la - 119)) & ~0x1f) === 0 && ((1 << (_la - 119)) & 2416395335) !== 0) || ((((_la - 153)) & ~0x1f) === 0 && ((1 << (_la - 153)) & 3349433397) !== 0) || ((((_la - 191)) & ~0x1f) === 0 && ((1 << (_la - 191)) & 3770207383) !== 0) || ((((_la - 224)) & ~0x1f) === 0 && ((1 << (_la - 224)) & 1686635585) !== 0) || ((((_la - 256)) & ~0x1f) === 0 && ((1 << (_la - 256)) & 808488173) !== 0) || ((((_la - 296)) & ~0x1f) === 0 && ((1 << (_la - 296)) & 2428544651) !== 0) || ((((_la - 329)) & ~0x1f) === 0 && ((1 << (_la - 329)) & 88618869) !== 0) || ((((_la - 361)) & ~0x1f) === 0 && ((1 << (_la - 361)) & 2824942721) !== 0) || ((((_la - 394)) & ~0x1f) === 0 && ((1 << (_la - 394)) & 2219847821) !== 0) || ((((_la - 431)) & ~0x1f) === 0 && ((1 << (_la - 431)) & 758383389) !== 0) || ((((_la - 465)) & ~0x1f) === 0 && ((1 << (_la - 465)) & 740299865) !== 0) || ((((_la - 508)) & ~0x1f) === 0 && ((1 << (_la - 508)) & 36735057) !== 0) || ((((_la - 540)) & ~0x1f) === 0 && ((1 << (_la - 540)) & 402723907) !== 0) || ((((_la - 572)) & ~0x1f) === 0 && ((1 << (_la - 572)) & 3225567455) !== 0) || ((((_la - 605)) & ~0x1f) === 0 && ((1 << (_la - 605)) & 2216153449) !== 0) || ((((_la - 637)) & ~0x1f) === 0 && ((1 << (_la - 637)) & 1101892873) !== 0) || ((((_la - 669)) & ~0x1f) === 0 && ((1 << (_la - 669)) & 2755170625) !== 0) || ((((_la - 702)) & ~0x1f) === 0 && ((1 << (_la - 702)) & 3258730575) !== 0) || ((((_la - 735)) & ~0x1f) === 0 && ((1 << (_la - 735)) & 2411987001) !== 0) || ((((_la - 772)) & ~0x1f) === 0 && ((1 << (_la - 772)) & 67734155) !== 0) || ((((_la - 805)) & ~0x1f) === 0 && ((1 << (_la - 805)) & 335642921) !== 0) || ((((_la - 837)) & ~0x1f) === 0 && ((1 << (_la - 837)) & 1152387975) !== 0) || ((((_la - 870)) & ~0x1f) === 0 && ((1 << (_la - 870)) & 3077) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	connector() {
	    let localctx = new ConnectorContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, HisyeoWordParser.RULE_connector);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 22;
	        _la = this._input.LA(1);
	        if(!(_la===61 || _la===117 || _la===609 || _la===840 || _la===868)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

HisyeoWordParser.EOF = antlr4.Token.EOF;
HisyeoWordParser.WS = 1;
HisyeoWordParser.Oiyo = 2;
HisyeoWordParser.ProperNoun = 3;
HisyeoWordParser.Comma = 4;
HisyeoWordParser.Colon = 5;
HisyeoWordParser.Period = 6;
HisyeoWordParser.QuestionStart = 7;
HisyeoWordParser.QuestionEnd = 8;
HisyeoWordParser.QuotationStart = 9;
HisyeoWordParser.QuotationEnd = 10;
HisyeoWordParser.Outo = 11;
HisyeoWordParser.Okulo = 12;
HisyeoWordParser.Oudi = 13;
HisyeoWordParser.Okot = 14;
HisyeoWordParser.Oksios = 15;
HisyeoWordParser.Oklumun = 16;
HisyeoWordParser.Oksun = 17;
HisyeoWordParser.Ogolol = 18;
HisyeoWordParser.Ogoge = 19;
HisyeoWordParser.Ocuo = 20;
HisyeoWordParser.Otos = 21;
HisyeoWordParser.Okoxu = 22;
HisyeoWordParser.Ostok = 23;
HisyeoWordParser.Odigon = 24;
HisyeoWordParser.Osyen = 25;
HisyeoWordParser.Ozuul = 26;
HisyeoWordParser.Oboki = 27;
HisyeoWordParser.Obo = 28;
HisyeoWordParser.Obunyun = 29;
HisyeoWordParser.Obulu = 30;
HisyeoWordParser.Ofek = 31;
HisyeoWordParser.Ofine = 32;
HisyeoWordParser.Omulto = 33;
HisyeoWordParser.Onkuol = 34;
HisyeoWordParser.Ono = 35;
HisyeoWordParser.Onkonu = 36;
HisyeoWordParser.Oncemon = 37;
HisyeoWordParser.Ondo = 38;
HisyeoWordParser.Ongolo = 39;
HisyeoWordParser.Ohel = 40;
HisyeoWordParser.Oitun = 41;
HisyeoWordParser.Onwoni = 42;
HisyeoWordParser.Otsotot = 43;
HisyeoWordParser.Onfibi = 44;
HisyeoWordParser.Osole = 45;
HisyeoWordParser.Oltu = 46;
HisyeoWordParser.Osti = 47;
HisyeoWordParser.Oldis = 48;
HisyeoWordParser.Ofo = 49;
HisyeoWordParser.Ozil = 50;
HisyeoWordParser.Odon = 51;
HisyeoWordParser.Obok = 52;
HisyeoWordParser.Oni = 53;
HisyeoWordParser.Et = 54;
HisyeoWordParser.Eson = 55;
HisyeoWordParser.Onton = 56;
HisyeoWordParser.Onsu = 57;
HisyeoWordParser.Eswen = 58;
HisyeoWordParser.Ole = 59;
HisyeoWordParser.Eloi = 60;
HisyeoWordParser.En = 61;
HisyeoWordParser.Eleke = 62;
HisyeoWordParser.Eo = 63;
HisyeoWordParser.Etso = 64;
HisyeoWordParser.Elentet = 65;
HisyeoWordParser.Elfu = 66;
HisyeoWordParser.Ebol = 67;
HisyeoWordParser.Eme = 68;
HisyeoWordParser.Efun = 69;
HisyeoWordParser.Itihos = 70;
HisyeoWordParser.Enbukun = 71;
HisyeoWordParser.Enkomon = 72;
HisyeoWordParser.Eleo = 73;
HisyeoWordParser.Isbulyol = 74;
HisyeoWordParser.Eto = 75;
HisyeoWordParser.Iciwu = 76;
HisyeoWordParser.Icwon = 77;
HisyeoWordParser.Istihol = 78;
HisyeoWordParser.Iwote = 79;
HisyeoWordParser.Isenso = 80;
HisyeoWordParser.Infultin = 81;
HisyeoWordParser.Isbonxu = 82;
HisyeoWordParser.Isko = 83;
HisyeoWordParser.Ixolo = 84;
HisyeoWordParser.Imon = 85;
HisyeoWordParser.Ibudu = 86;
HisyeoWordParser.Isibo = 87;
HisyeoWordParser.Ibuwe = 88;
HisyeoWordParser.Ilik = 89;
HisyeoWordParser.In = 90;
HisyeoWordParser.Ibole = 91;
HisyeoWordParser.Uklo = 92;
HisyeoWordParser.Usundul = 93;
HisyeoWordParser.Inboli = 94;
HisyeoWordParser.Uskifo = 95;
HisyeoWordParser.Ubolni = 96;
HisyeoWordParser.Ile = 97;
HisyeoWordParser.Ilxizuk = 98;
HisyeoWordParser.Umo = 99;
HisyeoWordParser.Ubenus = 100;
HisyeoWordParser.Ufulit = 101;
HisyeoWordParser.Undofol = 102;
HisyeoWordParser.Unbol = 103;
HisyeoWordParser.Uyo = 104;
HisyeoWordParser.Ulyo = 105;
HisyeoWordParser.Unon = 106;
HisyeoWordParser.U = 107;
HisyeoWordParser.Unbu = 108;
HisyeoWordParser.Usen = 109;
HisyeoWordParser.Ucumi = 110;
HisyeoWordParser.Usowo = 111;
HisyeoWordParser.Utok = 112;
HisyeoWordParser.Umomi = 113;
HisyeoWordParser.Usmon = 114;
HisyeoWordParser.Uslek = 115;
HisyeoWordParser.Unidu = 116;
HisyeoWordParser.Un = 117;
HisyeoWordParser.Unhilun = 118;
HisyeoWordParser.Uncoi = 119;
HisyeoWordParser.Ulkefi = 120;
HisyeoWordParser.Ulgukin = 121;
HisyeoWordParser.Ulonfu = 122;
HisyeoWordParser.Ulogun = 123;
HisyeoWordParser.Unfuno = 124;
HisyeoWordParser.Hokiki = 125;
HisyeoWordParser.Ulzo = 126;
HisyeoWordParser.Hoi = 127;
HisyeoWordParser.Hokoli = 128;
HisyeoWordParser.Hokuxi = 129;
HisyeoWordParser.Hosoun = 130;
HisyeoWordParser.Hoxobe = 131;
HisyeoWordParser.Hobiyo = 132;
HisyeoWordParser.Homus = 133;
HisyeoWordParser.Hondon = 134;
HisyeoWordParser.Hoos = 135;
HisyeoWordParser.Hosin = 136;
HisyeoWordParser.Hondot = 137;
HisyeoWordParser.Hofo = 138;
HisyeoWordParser.Hoktun = 139;
HisyeoWordParser.Hofezi = 140;
HisyeoWordParser.Hon = 141;
HisyeoWordParser.Honcou = 142;
HisyeoWordParser.Holuk = 143;
HisyeoWordParser.Holmo = 144;
HisyeoWordParser.Hodoku = 145;
HisyeoWordParser.Hefin = 146;
HisyeoWordParser.Henonde = 147;
HisyeoWordParser.Honyo = 148;
HisyeoWordParser.Helgo = 149;
HisyeoWordParser.Helxun = 150;
HisyeoWordParser.Henelo = 151;
HisyeoWordParser.Hitsu = 152;
HisyeoWordParser.Hitnodet = 153;
HisyeoWordParser.Hismo = 154;
HisyeoWordParser.Hizon = 155;
HisyeoWordParser.Hunzidu = 156;
HisyeoWordParser.Huluko = 157;
HisyeoWordParser.Huunhu = 158;
HisyeoWordParser.Huke = 159;
HisyeoWordParser.Hukun = 160;
HisyeoWordParser.Husku = 161;
HisyeoWordParser.Hustun = 162;
HisyeoWordParser.Hudul = 163;
HisyeoWordParser.Hunsik = 164;
HisyeoWordParser.Huzon = 165;
HisyeoWordParser.Hunsuon = 166;
HisyeoWordParser.Hiyoli = 167;
HisyeoWordParser.Huwuncul = 168;
HisyeoWordParser.Huwu = 169;
HisyeoWordParser.Hiskunco = 170;
HisyeoWordParser.Hiklihos = 171;
HisyeoWordParser.Hulodek = 172;
HisyeoWordParser.Hulu = 173;
HisyeoWordParser.Kocko = 174;
HisyeoWordParser.Kon = 175;
HisyeoWordParser.Kotilmok = 176;
HisyeoWordParser.Kobut = 177;
HisyeoWordParser.Kotonhon = 178;
HisyeoWordParser.Konxo = 179;
HisyeoWordParser.Ko = 180;
HisyeoWordParser.Kontol = 181;
HisyeoWordParser.Koi = 182;
HisyeoWordParser.Konbokbo = 183;
HisyeoWordParser.Konwo = 184;
HisyeoWordParser.Koto = 185;
HisyeoWordParser.Kolowu = 186;
HisyeoWordParser.Kokoku = 187;
HisyeoWordParser.Kos = 188;
HisyeoWordParser.Koson = 189;
HisyeoWordParser.Kotfusu = 190;
HisyeoWordParser.Koxente = 191;
HisyeoWordParser.Kotikol = 192;
HisyeoWordParser.Konen = 193;
HisyeoWordParser.Komu = 194;
HisyeoWordParser.Kodus = 195;
HisyeoWordParser.Kondodu = 196;
HisyeoWordParser.Kontesto = 197;
HisyeoWordParser.Kondonse = 198;
HisyeoWordParser.Kolmudul = 199;
HisyeoWordParser.Kosmo = 200;
HisyeoWordParser.Konyec = 201;
HisyeoWordParser.Konbo = 202;
HisyeoWordParser.Kelo = 203;
HisyeoWordParser.Ke = 204;
HisyeoWordParser.Keskin = 205;
HisyeoWordParser.Kexik = 206;
HisyeoWordParser.Kelos = 207;
HisyeoWordParser.Kiungo = 208;
HisyeoWordParser.Kistose = 209;
HisyeoWordParser.Kikolo = 210;
HisyeoWordParser.Kioso = 211;
HisyeoWordParser.Kiluku = 212;
HisyeoWordParser.Kisko = 213;
HisyeoWordParser.Kinoxi = 214;
HisyeoWordParser.Kino = 215;
HisyeoWordParser.Kiso = 216;
HisyeoWordParser.Kinse = 217;
HisyeoWordParser.Kuunme = 218;
HisyeoWordParser.Kinyosel = 219;
HisyeoWordParser.Kinlik = 220;
HisyeoWordParser.Kildo = 221;
HisyeoWordParser.Kiyo = 222;
HisyeoWordParser.Kut = 223;
HisyeoWordParser.Kutin = 224;
HisyeoWordParser.Kududo = 225;
HisyeoWordParser.Kukwon = 226;
HisyeoWordParser.Kuon = 227;
HisyeoWordParser.Kuocyo = 228;
HisyeoWordParser.Kuu = 229;
HisyeoWordParser.Kuonlon = 230;
HisyeoWordParser.Kukmut = 231;
HisyeoWordParser.Kusowi = 232;
HisyeoWordParser.Kunonti = 233;
HisyeoWordParser.Kuzou = 234;
HisyeoWordParser.Kudu = 235;
HisyeoWordParser.Kumun = 236;
HisyeoWordParser.Kuoxi = 237;
HisyeoWordParser.Kunhiun = 238;
HisyeoWordParser.Kuncien = 239;
HisyeoWordParser.Kungiyo = 240;
HisyeoWordParser.Kunbi = 241;
HisyeoWordParser.Kuldu = 242;
HisyeoWordParser.Gosil = 243;
HisyeoWordParser.Gos = 244;
HisyeoWordParser.Kulunun = 245;
HisyeoWordParser.Gomi = 246;
HisyeoWordParser.Kuyo = 247;
HisyeoWordParser.Goniso = 248;
HisyeoWordParser.Gonbu = 249;
HisyeoWordParser.Gonzil = 250;
HisyeoWordParser.Gongoxi = 251;
HisyeoWordParser.Golo = 252;
HisyeoWordParser.Golfon = 253;
HisyeoWordParser.Golbinus = 254;
HisyeoWordParser.Golun = 255;
HisyeoWordParser.Go = 256;
HisyeoWordParser.Gocidon = 257;
HisyeoWordParser.Gonyumon = 258;
HisyeoWordParser.Gowo = 259;
HisyeoWordParser.Goyu = 260;
HisyeoWordParser.Gemolen = 261;
HisyeoWordParser.Goluo = 262;
HisyeoWordParser.Gelmis = 263;
HisyeoWordParser.Gitno = 264;
HisyeoWordParser.Geko = 265;
HisyeoWordParser.Gion = 266;
HisyeoWordParser.Gik = 267;
HisyeoWordParser.Gito = 268;
HisyeoWordParser.Gubuyo = 269;
HisyeoWordParser.Gisgul = 270;
HisyeoWordParser.Gufis = 271;
HisyeoWordParser.Gueyu = 272;
HisyeoWordParser.Guexo = 273;
HisyeoWordParser.Gundole = 274;
HisyeoWordParser.Gudolo = 275;
HisyeoWordParser.Guso = 276;
HisyeoWordParser.Gunokol = 277;
HisyeoWordParser.Gumi = 278;
HisyeoWordParser.Guwolo = 279;
HisyeoWordParser.Gufoxe = 280;
HisyeoWordParser.Gufio = 281;
HisyeoWordParser.Gulu = 282;
HisyeoWordParser.Tou = 283;
HisyeoWordParser.Gulobi = 284;
HisyeoWordParser.Totsi = 285;
HisyeoWordParser.Touyen = 286;
HisyeoWordParser.Tohilok = 287;
HisyeoWordParser.Toswil = 288;
HisyeoWordParser.Toliyo = 289;
HisyeoWordParser.Towe = 290;
HisyeoWordParser.Tonbokcut = 291;
HisyeoWordParser.Tolen = 292;
HisyeoWordParser.Toliko = 293;
HisyeoWordParser.Tolxeto = 294;
HisyeoWordParser.To = 295;
HisyeoWordParser.Tocit = 296;
HisyeoWordParser.Toncoi = 297;
HisyeoWordParser.Tomos = 298;
HisyeoWordParser.Tolki = 299;
HisyeoWordParser.Toxutsi = 300;
HisyeoWordParser.Tenkin = 301;
HisyeoWordParser.Tetek = 302;
HisyeoWordParser.Tigoyo = 303;
HisyeoWordParser.Telo = 304;
HisyeoWordParser.Tifulci = 305;
HisyeoWordParser.Tonko = 306;
HisyeoWordParser.Tiu = 307;
HisyeoWordParser.Til = 308;
HisyeoWordParser.Tiku = 309;
HisyeoWordParser.Tukwos = 310;
HisyeoWordParser.Tikel = 311;
HisyeoWordParser.Tixo = 312;
HisyeoWordParser.Tubo = 313;
HisyeoWordParser.Titon = 314;
HisyeoWordParser.Timiok = 315;
HisyeoWordParser.Tuluti = 316;
HisyeoWordParser.Tuek = 317;
HisyeoWordParser.Tulkolyun = 318;
HisyeoWordParser.Tut = 319;
HisyeoWordParser.Tundu = 320;
HisyeoWordParser.Tuu = 321;
HisyeoWordParser.Tulokon = 322;
HisyeoWordParser.Tulono = 323;
HisyeoWordParser.Cok = 324;
HisyeoWordParser.Comen = 325;
HisyeoWordParser.Cokwoli = 326;
HisyeoWordParser.Cokyen = 327;
HisyeoWordParser.Conoi = 328;
HisyeoWordParser.Cosni = 329;
HisyeoWordParser.Conwebo = 330;
HisyeoWordParser.Colot = 331;
HisyeoWordParser.Coufon = 332;
HisyeoWordParser.Conzodo = 333;
HisyeoWordParser.Cot = 334;
HisyeoWordParser.Counton = 335;
HisyeoWordParser.Cocko = 336;
HisyeoWordParser.Comel = 337;
HisyeoWordParser.Conkok = 338;
HisyeoWordParser.Centik = 339;
HisyeoWordParser.Ceo = 340;
HisyeoWordParser.Cenci = 341;
HisyeoWordParser.Cenbo = 342;
HisyeoWordParser.Cen = 343;
HisyeoWordParser.Cixin = 344;
HisyeoWordParser.Cihou = 345;
HisyeoWordParser.Cifu = 346;
HisyeoWordParser.Cizi = 347;
HisyeoWordParser.Cifulo = 348;
HisyeoWordParser.Cino = 349;
HisyeoWordParser.Cingi = 350;
HisyeoWordParser.Cinobu = 351;
HisyeoWordParser.Ciwindi = 352;
HisyeoWordParser.Cies = 353;
HisyeoWordParser.Ci = 354;
HisyeoWordParser.Cienxin = 355;
HisyeoWordParser.Cihun = 356;
HisyeoWordParser.Cikinil = 357;
HisyeoWordParser.Cibon = 358;
HisyeoWordParser.Cigilsu = 359;
HisyeoWordParser.Citse = 360;
HisyeoWordParser.Cinzon = 361;
HisyeoWordParser.Cinli = 362;
HisyeoWordParser.Cuskido = 363;
HisyeoWordParser.Cukto = 364;
HisyeoWordParser.Cunliu = 365;
HisyeoWordParser.Cuncion = 366;
HisyeoWordParser.Cuonwun = 367;
HisyeoWordParser.Cunyu = 368;
HisyeoWordParser.Cutne = 369;
HisyeoWordParser.Culono = 370;
HisyeoWordParser.Cuti = 371;
HisyeoWordParser.Cui = 372;
HisyeoWordParser.Cubu = 373;
HisyeoWordParser.Cuxien = 374;
HisyeoWordParser.Cudo = 375;
HisyeoWordParser.Cufo = 376;
HisyeoWordParser.Cunfu = 377;
HisyeoWordParser.Cungo = 378;
HisyeoWordParser.Cundol = 379;
HisyeoWordParser.Culosun = 380;
HisyeoWordParser.Sokofu = 381;
HisyeoWordParser.Sohou = 382;
HisyeoWordParser.Sokol = 383;
HisyeoWordParser.Culci = 384;
HisyeoWordParser.Sotnin = 385;
HisyeoWordParser.Culul = 386;
HisyeoWordParser.Soden = 387;
HisyeoWordParser.Sodolun = 388;
HisyeoWordParser.Socok = 389;
HisyeoWordParser.Sodilu = 390;
HisyeoWordParser.Sobole = 391;
HisyeoWordParser.Sobuni = 392;
HisyeoWordParser.Sobis = 393;
HisyeoWordParser.Sonkon = 394;
HisyeoWordParser.Somo = 395;
HisyeoWordParser.Sofin = 396;
HisyeoWordParser.Sonti = 397;
HisyeoWordParser.Solilo = 398;
HisyeoWordParser.Solwoc = 399;
HisyeoWordParser.Sotun = 400;
HisyeoWordParser.Sonsus = 401;
HisyeoWordParser.Sohouk = 402;
HisyeoWordParser.Sobo = 403;
HisyeoWordParser.Solu = 404;
HisyeoWordParser.Ses = 405;
HisyeoWordParser.Sondonos = 406;
HisyeoWordParser.Soltustik = 407;
HisyeoWordParser.Senwic = 408;
HisyeoWordParser.Seki = 409;
HisyeoWordParser.Seloho = 410;
HisyeoWordParser.Sedu = 411;
HisyeoWordParser.Semoi = 412;
HisyeoWordParser.Sekiton = 413;
HisyeoWordParser.Selbo = 414;
HisyeoWordParser.Siskin = 415;
HisyeoWordParser.Senzo = 416;
HisyeoWordParser.Sel = 417;
HisyeoWordParser.Sityo = 418;
HisyeoWordParser.Si = 419;
HisyeoWordParser.Siokbi = 420;
HisyeoWordParser.Sieto = 421;
HisyeoWordParser.Sinsi = 422;
HisyeoWordParser.Sikot = 423;
HisyeoWordParser.Siufo = 424;
HisyeoWordParser.Sinexis = 425;
HisyeoWordParser.Sintokmo = 426;
HisyeoWordParser.Sikin = 427;
HisyeoWordParser.Suhot = 428;
HisyeoWordParser.Sukyunik = 429;
HisyeoWordParser.Sufoun = 430;
HisyeoWordParser.Sumon = 431;
HisyeoWordParser.Sundibot = 432;
HisyeoWordParser.Sunbulno = 433;
HisyeoWordParser.Sunyotni = 434;
HisyeoWordParser.Suit = 435;
HisyeoWordParser.Sutuo = 436;
HisyeoWordParser.Suoxic = 437;
HisyeoWordParser.Suson = 438;
HisyeoWordParser.Xoinbo = 439;
HisyeoWordParser.Subol = 440;
HisyeoWordParser.Xohofec = 441;
HisyeoWordParser.Sunbidu = 442;
HisyeoWordParser.Suko = 443;
HisyeoWordParser.Sun = 444;
HisyeoWordParser.Xofo = 445;
HisyeoWordParser.Xokulu = 446;
HisyeoWordParser.Xobo = 447;
HisyeoWordParser.Xontun = 448;
HisyeoWordParser.Xobek = 449;
HisyeoWordParser.Xokon = 450;
HisyeoWordParser.Xonluk = 451;
HisyeoWordParser.Xoboi = 452;
HisyeoWordParser.Xomutlo = 453;
HisyeoWordParser.Xe = 454;
HisyeoWordParser.Xowose = 455;
HisyeoWordParser.Xolu = 456;
HisyeoWordParser.Xecinoc = 457;
HisyeoWordParser.Xolxili = 458;
HisyeoWordParser.Xemetsen = 459;
HisyeoWordParser.Xon = 460;
HisyeoWordParser.Xeti = 461;
HisyeoWordParser.Xefizec = 462;
HisyeoWordParser.Xingo = 463;
HisyeoWordParser.Xifon = 464;
HisyeoWordParser.Xentil = 465;
HisyeoWordParser.Xiufu = 466;
HisyeoWordParser.Xiulo = 467;
HisyeoWordParser.Xiko = 468;
HisyeoWordParser.Xidetli = 469;
HisyeoWordParser.Xixulko = 470;
HisyeoWordParser.Xisu = 471;
HisyeoWordParser.Ximol = 472;
HisyeoWordParser.Xincuon = 473;
HisyeoWordParser.Ximu = 474;
HisyeoWordParser.Xulmindo = 475;
HisyeoWordParser.Xiwon = 476;
HisyeoWordParser.Xiyocu = 477;
HisyeoWordParser.Xuto = 478;
HisyeoWordParser.Xuk = 479;
HisyeoWordParser.Xusten = 480;
HisyeoWordParser.Doi = 481;
HisyeoWordParser.Xunyu = 482;
HisyeoWordParser.Xuxok = 483;
HisyeoWordParser.Doinbi = 484;
HisyeoWordParser.Doho = 485;
HisyeoWordParser.Dohil = 486;
HisyeoWordParser.Doicel = 487;
HisyeoWordParser.Dokdogo = 488;
HisyeoWordParser.Dodou = 489;
HisyeoWordParser.Doknu = 490;
HisyeoWordParser.Dondun = 491;
HisyeoWordParser.Dokcon = 492;
HisyeoWordParser.Donus = 493;
HisyeoWordParser.Dode = 494;
HisyeoWordParser.Docui = 495;
HisyeoWordParser.Dostoc = 496;
HisyeoWordParser.Donuxin = 497;
HisyeoWordParser.Deku = 498;
HisyeoWordParser.Deko = 499;
HisyeoWordParser.Des = 500;
HisyeoWordParser.Den = 501;
HisyeoWordParser.Di = 502;
HisyeoWordParser.Dibo = 503;
HisyeoWordParser.Dizel = 504;
HisyeoWordParser.Detoi = 505;
HisyeoWordParser.Denemek = 506;
HisyeoWordParser.Dinci = 507;
HisyeoWordParser.Didozu = 508;
HisyeoWordParser.Dinzou = 509;
HisyeoWordParser.Diyonde = 510;
HisyeoWordParser.Duuhon = 511;
HisyeoWordParser.Dile = 512;
HisyeoWordParser.Dus = 513;
HisyeoWordParser.Dukwelit = 514;
HisyeoWordParser.Dumoko = 515;
HisyeoWordParser.Duwoni = 516;
HisyeoWordParser.Dui = 517;
HisyeoWordParser.Duuncit = 518;
HisyeoWordParser.Dusul = 519;
HisyeoWordParser.Dubono = 520;
HisyeoWordParser.Dustu = 521;
HisyeoWordParser.Dungo = 522;
HisyeoWordParser.Dundon = 523;
HisyeoWordParser.Zoso = 524;
HisyeoWordParser.Zomo = 525;
HisyeoWordParser.Zoston = 526;
HisyeoWordParser.Zomi = 527;
HisyeoWordParser.Zonubi = 528;
HisyeoWordParser.Zomuni = 529;
HisyeoWordParser.Zonwul = 530;
HisyeoWordParser.Zowo = 531;
HisyeoWordParser.Zohit = 532;
HisyeoWordParser.Zoi = 533;
HisyeoWordParser.Zoloni = 534;
HisyeoWordParser.Zohun = 535;
HisyeoWordParser.Zoli = 536;
HisyeoWordParser.Zogoc = 537;
HisyeoWordParser.Zotesto = 538;
HisyeoWordParser.Ze = 539;
HisyeoWordParser.Zelen = 540;
HisyeoWordParser.Zensi = 541;
HisyeoWordParser.Zesto = 542;
HisyeoWordParser.Zik = 543;
HisyeoWordParser.Zizime = 544;
HisyeoWordParser.Ziyon = 545;
HisyeoWordParser.Zigil = 546;
HisyeoWordParser.Zinkon = 547;
HisyeoWordParser.Zicou = 548;
HisyeoWordParser.Zixitu = 549;
HisyeoWordParser.Zingu = 550;
HisyeoWordParser.Ziziyo = 551;
HisyeoWordParser.Ziwit = 552;
HisyeoWordParser.Zuko = 553;
HisyeoWordParser.Zusbot = 554;
HisyeoWordParser.Zuwobu = 555;
HisyeoWordParser.Zilyois = 556;
HisyeoWordParser.Zungo = 557;
HisyeoWordParser.Zuto = 558;
HisyeoWordParser.Zuntulu = 559;
HisyeoWordParser.Zuhu = 560;
HisyeoWordParser.Zuyi = 561;
HisyeoWordParser.Boifon = 562;
HisyeoWordParser.Zunlo = 563;
HisyeoWordParser.Boit = 564;
HisyeoWordParser.Boholon = 565;
HisyeoWordParser.Bogo = 566;
HisyeoWordParser.Botuk = 567;
HisyeoWordParser.Bodi = 568;
HisyeoWordParser.Bostofis = 569;
HisyeoWordParser.Boxo = 570;
HisyeoWordParser.Boboun = 571;
HisyeoWordParser.Bono = 572;
HisyeoWordParser.Botyoto = 573;
HisyeoWordParser.Bonoxo = 574;
HisyeoWordParser.Bolimot = 575;
HisyeoWordParser.Bongosi = 576;
HisyeoWordParser.Bole = 577;
HisyeoWordParser.Boyok = 578;
HisyeoWordParser.Bomoge = 579;
HisyeoWordParser.Bokofoc = 580;
HisyeoWordParser.Bolce = 581;
HisyeoWordParser.Boklon = 582;
HisyeoWordParser.Bosol = 583;
HisyeoWordParser.Bonti = 584;
HisyeoWordParser.Bokbun = 585;
HisyeoWordParser.Bolute = 586;
HisyeoWordParser.Bolfele = 587;
HisyeoWordParser.Betido = 588;
HisyeoWordParser.Belisis = 589;
HisyeoWordParser.Besol = 590;
HisyeoWordParser.Belexu = 591;
HisyeoWordParser.Beudo = 592;
HisyeoWordParser.Beiku = 593;
HisyeoWordParser.Besu = 594;
HisyeoWordParser.Belete = 595;
HisyeoWordParser.Besnehot = 596;
HisyeoWordParser.Bindu = 597;
HisyeoWordParser.Bi = 598;
HisyeoWordParser.Binleo = 599;
HisyeoWordParser.Bitun = 600;
HisyeoWordParser.Bioli = 601;
HisyeoWordParser.Bilit = 602;
HisyeoWordParser.Bikonte = 603;
HisyeoWordParser.Biomu = 604;
HisyeoWordParser.Bicuon = 605;
HisyeoWordParser.Biek = 606;
HisyeoWordParser.Bit = 607;
HisyeoWordParser.Bisu = 608;
HisyeoWordParser.Bine = 609;
HisyeoWordParser.Bibok = 610;
HisyeoWordParser.Binhun = 611;
HisyeoWordParser.Binton = 612;
HisyeoWordParser.Buku = 613;
HisyeoWordParser.Bucono = 614;
HisyeoWordParser.Buswelin = 615;
HisyeoWordParser.Buswen = 616;
HisyeoWordParser.Bunxin = 617;
HisyeoWordParser.Buyencok = 618;
HisyeoWordParser.Bundu = 619;
HisyeoWordParser.Bugot = 620;
HisyeoWordParser.Buihi = 621;
HisyeoWordParser.Busin = 622;
HisyeoWordParser.Buslu = 623;
HisyeoWordParser.Budogo = 624;
HisyeoWordParser.Budiko = 625;
HisyeoWordParser.Buzok = 626;
HisyeoWordParser.Bumi = 627;
HisyeoWordParser.Buntut = 628;
HisyeoWordParser.Bunduki = 629;
HisyeoWordParser.Fout = 630;
HisyeoWordParser.Bulo = 631;
HisyeoWordParser.Fohoso = 632;
HisyeoWordParser.Bulusi = 633;
HisyeoWordParser.Fos = 634;
HisyeoWordParser.Bemon = 635;
HisyeoWordParser.Bilus = 636;
HisyeoWordParser.But = 637;
HisyeoWordParser.Fonolon = 638;
HisyeoWordParser.Foxo = 639;
HisyeoWordParser.Fonmot = 640;
HisyeoWordParser.Fonxin = 641;
HisyeoWordParser.Folo = 642;
HisyeoWordParser.Foko = 643;
HisyeoWordParser.Fohon = 644;
HisyeoWordParser.Fogicin = 645;
HisyeoWordParser.Fodoloc = 646;
HisyeoWordParser.Folni = 647;
HisyeoWordParser.Fonfuk = 648;
HisyeoWordParser.Folun = 649;
HisyeoWordParser.Fecko = 650;
HisyeoWordParser.Fikwun = 651;
HisyeoWordParser.Felkono = 652;
HisyeoWordParser.Felcin = 653;
HisyeoWordParser.Fenuo = 654;
HisyeoWordParser.Fildonbun = 655;
HisyeoWordParser.Fiectu = 656;
HisyeoWordParser.Fisun = 657;
HisyeoWordParser.Fitikos = 658;
HisyeoWordParser.Fiyuxit = 659;
HisyeoWordParser.Fimosyos = 660;
HisyeoWordParser.Ficwo = 661;
HisyeoWordParser.Filo = 662;
HisyeoWordParser.Fizi = 663;
HisyeoWordParser.Fui = 664;
HisyeoWordParser.Fiyen = 665;
HisyeoWordParser.Fun = 666;
HisyeoWordParser.Funsut = 667;
HisyeoWordParser.Fulkoi = 668;
HisyeoWordParser.Funlit = 669;
HisyeoWordParser.Futsun = 670;
HisyeoWordParser.Fuongok = 671;
HisyeoWordParser.Fukuxi = 672;
HisyeoWordParser.Fuus = 673;
HisyeoWordParser.Fuxubin = 674;
HisyeoWordParser.Funbetsi = 675;
HisyeoWordParser.Funlok = 676;
HisyeoWordParser.Fiki = 677;
HisyeoWordParser.Mokon = 678;
HisyeoWordParser.Funbo = 679;
HisyeoWordParser.Motuo = 680;
HisyeoWordParser.Moskul = 681;
HisyeoWordParser.Mocko = 682;
HisyeoWordParser.Mozulis = 683;
HisyeoWordParser.Moziko = 684;
HisyeoWordParser.Motsi = 685;
HisyeoWordParser.Mozun = 686;
HisyeoWordParser.Monodo = 687;
HisyeoWordParser.Momoki = 688;
HisyeoWordParser.Moxo = 689;
HisyeoWordParser.Montuksol = 690;
HisyeoWordParser.Mongo = 691;
HisyeoWordParser.Moi = 692;
HisyeoWordParser.Mokofo = 693;
HisyeoWordParser.Moto = 694;
HisyeoWordParser.Mokwon = 695;
HisyeoWordParser.Motowo = 696;
HisyeoWordParser.Motifo = 697;
HisyeoWordParser.Mocibo = 698;
HisyeoWordParser.Motsile = 699;
HisyeoWordParser.Mofi = 700;
HisyeoWordParser.Moniso = 701;
HisyeoWordParser.Mefus = 702;
HisyeoWordParser.Metlios = 703;
HisyeoWordParser.Meduson = 704;
HisyeoWordParser.Monbili = 705;
HisyeoWordParser.Menyuu = 706;
HisyeoWordParser.Menus = 707;
HisyeoWordParser.Mixofo = 708;
HisyeoWordParser.Meloc = 709;
HisyeoWordParser.Misli = 710;
HisyeoWordParser.Minyoto = 711;
HisyeoWordParser.Minyo = 712;
HisyeoWordParser.Miou = 713;
HisyeoWordParser.Mikdol = 714;
HisyeoWordParser.Miebil = 715;
HisyeoWordParser.Miteten = 716;
HisyeoWordParser.Mitmo = 717;
HisyeoWordParser.Micin = 718;
HisyeoWordParser.Miencok = 719;
HisyeoWordParser.Mile = 720;
HisyeoWordParser.Mihuon = 721;
HisyeoWordParser.Muilo = 722;
HisyeoWordParser.Mistu = 723;
HisyeoWordParser.Muni = 724;
HisyeoWordParser.Munyufo = 725;
HisyeoWordParser.Mutyu = 726;
HisyeoWordParser.Muun = 727;
HisyeoWordParser.Muesi = 728;
HisyeoWordParser.Mukonun = 729;
HisyeoWordParser.Mut = 730;
HisyeoWordParser.Muhoyon = 731;
HisyeoWordParser.Mukno = 732;
HisyeoWordParser.Mustokin = 733;
HisyeoWordParser.Muxi = 734;
HisyeoWordParser.Mufeu = 735;
HisyeoWordParser.Noi = 736;
HisyeoWordParser.Noo = 737;
HisyeoWordParser.Mulu = 738;
HisyeoWordParser.Nokdo = 739;
HisyeoWordParser.Muncu = 740;
HisyeoWordParser.Muncoti = 741;
HisyeoWordParser.Nouku = 742;
HisyeoWordParser.Nocido = 743;
HisyeoWordParser.Nozi = 744;
HisyeoWordParser.Non = 745;
HisyeoWordParser.Nomu = 746;
HisyeoWordParser.Noso = 747;
HisyeoWordParser.Nonku = 748;
HisyeoWordParser.Nodu = 749;
HisyeoWordParser.Noyo = 750;
HisyeoWordParser.Nonto = 751;
HisyeoWordParser.Neigin = 752;
HisyeoWordParser.No = 753;
HisyeoWordParser.Nokso = 754;
HisyeoWordParser.Noilu = 755;
HisyeoWordParser.Nec = 756;
HisyeoWordParser.Nexe = 757;
HisyeoWordParser.Nebu = 758;
HisyeoWordParser.Nendol = 759;
HisyeoWordParser.Nexodi = 760;
HisyeoWordParser.Neos = 761;
HisyeoWordParser.Nelo = 762;
HisyeoWordParser.Ni = 763;
HisyeoWordParser.Nenko = 764;
HisyeoWordParser.Nicu = 765;
HisyeoWordParser.Nikful = 766;
HisyeoWordParser.Niswi = 767;
HisyeoWordParser.Niwos = 768;
HisyeoWordParser.Nixin = 769;
HisyeoWordParser.Nilol = 770;
HisyeoWordParser.Nio = 771;
HisyeoWordParser.Niok = 772;
HisyeoWordParser.Niecni = 773;
HisyeoWordParser.Nimu = 774;
HisyeoWordParser.Nubuso = 775;
HisyeoWordParser.Nucoto = 776;
HisyeoWordParser.Nukulo = 777;
HisyeoWordParser.Niltugu = 778;
HisyeoWordParser.Nungo = 779;
HisyeoWordParser.Numuno = 780;
HisyeoWordParser.Nulto = 781;
HisyeoWordParser.Nuluhu = 782;
HisyeoWordParser.Wohi = 783;
HisyeoWordParser.Nuyo = 784;
HisyeoWordParser.Wokut = 785;
HisyeoWordParser.Nus = 786;
HisyeoWordParser.Nulun = 787;
HisyeoWordParser.Wodino = 788;
HisyeoWordParser.Wokto = 789;
HisyeoWordParser.Wofok = 790;
HisyeoWordParser.Wonkuk = 791;
HisyeoWordParser.Wobi = 792;
HisyeoWordParser.Woyu = 793;
HisyeoWordParser.Woloko = 794;
HisyeoWordParser.Wedo = 795;
HisyeoWordParser.Wowoe = 796;
HisyeoWordParser.Weilun = 797;
HisyeoWordParser.Welto = 798;
HisyeoWordParser.Wolik = 799;
HisyeoWordParser.Weko = 800;
HisyeoWordParser.Wetodu = 801;
HisyeoWordParser.Wekeso = 802;
HisyeoWordParser.Wexon = 803;
HisyeoWordParser.Wikse = 804;
HisyeoWordParser.Winit = 805;
HisyeoWordParser.Wetu = 806;
HisyeoWordParser.Wixonu = 807;
HisyeoWordParser.Wixes = 808;
HisyeoWordParser.Wibolo = 809;
HisyeoWordParser.Wili = 810;
HisyeoWordParser.Weloi = 811;
HisyeoWordParser.Wuitsi = 812;
HisyeoWordParser.Wuktomu = 813;
HisyeoWordParser.Wuto = 814;
HisyeoWordParser.Wutun = 815;
HisyeoWordParser.Wik = 816;
HisyeoWordParser.Wiluwo = 817;
HisyeoWordParser.Wulus = 818;
HisyeoWordParser.Wuot = 819;
HisyeoWordParser.Losol = 820;
HisyeoWordParser.Lohot = 821;
HisyeoWordParser.Lozido = 822;
HisyeoWordParser.Lobotol = 823;
HisyeoWordParser.Longi = 824;
HisyeoWordParser.Lozo = 825;
HisyeoWordParser.Lon = 826;
HisyeoWordParser.Loicok = 827;
HisyeoWordParser.Lono = 828;
HisyeoWordParser.Lotfen = 829;
HisyeoWordParser.Lolu = 830;
HisyeoWordParser.Londuluk = 831;
HisyeoWordParser.Lozic = 832;
HisyeoWordParser.Loc = 833;
HisyeoWordParser.Lonkin = 834;
HisyeoWordParser.Leknek = 835;
HisyeoWordParser.Lexetko = 836;
HisyeoWordParser.Legefu = 837;
HisyeoWordParser.Lefotol = 838;
HisyeoWordParser.Lionxin = 839;
HisyeoWordParser.Lekin = 840;
HisyeoWordParser.Liun = 841;
HisyeoWordParser.Liubit = 842;
HisyeoWordParser.Li = 843;
HisyeoWordParser.Liule = 844;
HisyeoWordParser.Lis = 845;
HisyeoWordParser.Lito = 846;
HisyeoWordParser.Libu = 847;
HisyeoWordParser.Litiwe = 848;
HisyeoWordParser.Listo = 849;
HisyeoWordParser.Luhu = 850;
HisyeoWordParser.Limien = 851;
HisyeoWordParser.Lufono = 852;
HisyeoWordParser.Lismu = 853;
HisyeoWordParser.Luicu = 854;
HisyeoWordParser.Lunsol = 855;
HisyeoWordParser.Luok = 856;
HisyeoWordParser.Luko = 857;
HisyeoWordParser.Lucik = 858;
HisyeoWordParser.Lucku = 859;
HisyeoWordParser.Youmok = 860;
HisyeoWordParser.Youti = 861;
HisyeoWordParser.Yokuntik = 862;
HisyeoWordParser.Lunti = 863;
HisyeoWordParser.Yoskinyo = 864;
HisyeoWordParser.Yogo = 865;
HisyeoWordParser.Yosten = 866;
HisyeoWordParser.Yobe = 867;
HisyeoWordParser.Yodo = 868;
HisyeoWordParser.Yofuk = 869;
HisyeoWordParser.Youli = 870;
HisyeoWordParser.Yoldun = 871;
HisyeoWordParser.Yonlus = 872;
HisyeoWordParser.Youxin = 873;
HisyeoWordParser.Yok = 874;
HisyeoWordParser.Yocno = 875;
HisyeoWordParser.Yon = 876;
HisyeoWordParser.Ye = 877;
HisyeoWordParser.Yone = 878;
HisyeoWordParser.Yinyunci = 879;
HisyeoWordParser.Yinsuk = 880;
HisyeoWordParser.Yumon = 881;
HisyeoWordParser.Yundou = 882;
HisyeoWordParser.Yukwoi = 883;
HisyeoWordParser.Yunlon = 884;

HisyeoWordParser.RULE_postposition = 0;
HisyeoWordParser.RULE_pronoun = 1;
HisyeoWordParser.RULE_rawVerbs = 2;
HisyeoWordParser.RULE_rawNouns = 3;
HisyeoWordParser.RULE_rawModifiers = 4;
HisyeoWordParser.RULE_connector = 5;

class PostpositionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HisyeoWordParser.RULE_postposition;
    }

	Ko() {
	    return this.getToken(HisyeoWordParser.Ko, 0);
	};

	Ci() {
	    return this.getToken(HisyeoWordParser.Ci, 0);
	};

	Ze() {
	    return this.getToken(HisyeoWordParser.Ze, 0);
	};

	Foxo() {
	    return this.getToken(HisyeoWordParser.Foxo, 0);
	};

	Lotfen() {
	    return this.getToken(HisyeoWordParser.Lotfen, 0);
	};

	Loicok() {
	    return this.getToken(HisyeoWordParser.Loicok, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.enterPostposition(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.exitPostposition(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HisyeoWordParserVisitor ) {
	        return visitor.visitPostposition(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class PronounContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HisyeoWordParser.RULE_pronoun;
    }

	Ozuul() {
	    return this.getToken(HisyeoWordParser.Ozuul, 0);
	};

	Ono() {
	    return this.getToken(HisyeoWordParser.Ono, 0);
	};

	Ofo() {
	    return this.getToken(HisyeoWordParser.Ofo, 0);
	};

	Ulyo() {
	    return this.getToken(HisyeoWordParser.Ulyo, 0);
	};

	Cizi() {
	    return this.getToken(HisyeoWordParser.Cizi, 0);
	};

	Dizel() {
	    return this.getToken(HisyeoWordParser.Dizel, 0);
	};

	Zik() {
	    return this.getToken(HisyeoWordParser.Zik, 0);
	};

	Noyo() {
	    return this.getToken(HisyeoWordParser.Noyo, 0);
	};

	Ni() {
	    return this.getToken(HisyeoWordParser.Ni, 0);
	};

	Nio() {
	    return this.getToken(HisyeoWordParser.Nio, 0);
	};

	Nimu() {
	    return this.getToken(HisyeoWordParser.Nimu, 0);
	};

	Nus() {
	    return this.getToken(HisyeoWordParser.Nus, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.enterPronoun(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.exitPronoun(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HisyeoWordParserVisitor ) {
	        return visitor.visitPronoun(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class RawVerbsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HisyeoWordParser.RULE_rawVerbs;
    }

	Outo() {
	    return this.getToken(HisyeoWordParser.Outo, 0);
	};

	Okot() {
	    return this.getToken(HisyeoWordParser.Okot, 0);
	};

	Okulo() {
	    return this.getToken(HisyeoWordParser.Okulo, 0);
	};

	Ogolol() {
	    return this.getToken(HisyeoWordParser.Ogolol, 0);
	};

	Obulu() {
	    return this.getToken(HisyeoWordParser.Obulu, 0);
	};

	Onkonu() {
	    return this.getToken(HisyeoWordParser.Onkonu, 0);
	};

	Onkuol() {
	    return this.getToken(HisyeoWordParser.Onkuol, 0);
	};

	Oncemon() {
	    return this.getToken(HisyeoWordParser.Oncemon, 0);
	};

	Ondo() {
	    return this.getToken(HisyeoWordParser.Ondo, 0);
	};

	Oitun() {
	    return this.getToken(HisyeoWordParser.Oitun, 0);
	};

	Onton() {
	    return this.getToken(HisyeoWordParser.Onton, 0);
	};

	Isko() {
	    return this.getToken(HisyeoWordParser.Isko, 0);
	};

	Imon() {
	    return this.getToken(HisyeoWordParser.Imon, 0);
	};

	Icwon() {
	    return this.getToken(HisyeoWordParser.Icwon, 0);
	};

	Uskifo() {
	    return this.getToken(HisyeoWordParser.Uskifo, 0);
	};

	Unon() {
	    return this.getToken(HisyeoWordParser.Unon, 0);
	};

	Uslek() {
	    return this.getToken(HisyeoWordParser.Uslek, 0);
	};

	Unhilun() {
	    return this.getToken(HisyeoWordParser.Unhilun, 0);
	};

	Hobiyo() {
	    return this.getToken(HisyeoWordParser.Hobiyo, 0);
	};

	Hofo() {
	    return this.getToken(HisyeoWordParser.Hofo, 0);
	};

	Hodoku() {
	    return this.getToken(HisyeoWordParser.Hodoku, 0);
	};

	Hefin() {
	    return this.getToken(HisyeoWordParser.Hefin, 0);
	};

	Helgo() {
	    return this.getToken(HisyeoWordParser.Helgo, 0);
	};

	Huke() {
	    return this.getToken(HisyeoWordParser.Huke, 0);
	};

	Hukun() {
	    return this.getToken(HisyeoWordParser.Hukun, 0);
	};

	Husku() {
	    return this.getToken(HisyeoWordParser.Husku, 0);
	};

	Kontol() {
	    return this.getToken(HisyeoWordParser.Kontol, 0);
	};

	Koto() {
	    return this.getToken(HisyeoWordParser.Koto, 0);
	};

	Kos() {
	    return this.getToken(HisyeoWordParser.Kos, 0);
	};

	Koson() {
	    return this.getToken(HisyeoWordParser.Koson, 0);
	};

	Kontesto() {
	    return this.getToken(HisyeoWordParser.Kontesto, 0);
	};

	Kondodu() {
	    return this.getToken(HisyeoWordParser.Kondodu, 0);
	};

	Kelo() {
	    return this.getToken(HisyeoWordParser.Kelo, 0);
	};

	Kiso() {
	    return this.getToken(HisyeoWordParser.Kiso, 0);
	};

	Kududo() {
	    return this.getToken(HisyeoWordParser.Kududo, 0);
	};

	Gomi() {
	    return this.getToken(HisyeoWordParser.Gomi, 0);
	};

	Goniso() {
	    return this.getToken(HisyeoWordParser.Goniso, 0);
	};

	Golun() {
	    return this.getToken(HisyeoWordParser.Golun, 0);
	};

	Golo() {
	    return this.getToken(HisyeoWordParser.Golo, 0);
	};

	Gocidon() {
	    return this.getToken(HisyeoWordParser.Gocidon, 0);
	};

	Gufio() {
	    return this.getToken(HisyeoWordParser.Gufio, 0);
	};

	Guwolo() {
	    return this.getToken(HisyeoWordParser.Guwolo, 0);
	};

	Toswil() {
	    return this.getToken(HisyeoWordParser.Toswil, 0);
	};

	Touyen() {
	    return this.getToken(HisyeoWordParser.Touyen, 0);
	};

	Tenkin() {
	    return this.getToken(HisyeoWordParser.Tenkin, 0);
	};

	Tuluti() {
	    return this.getToken(HisyeoWordParser.Tuluti, 0);
	};

	Tuek() {
	    return this.getToken(HisyeoWordParser.Tuek, 0);
	};

	Tuu() {
	    return this.getToken(HisyeoWordParser.Tuu, 0);
	};

	Tulokon() {
	    return this.getToken(HisyeoWordParser.Tulokon, 0);
	};

	Conwebo() {
	    return this.getToken(HisyeoWordParser.Conwebo, 0);
	};

	Coufon() {
	    return this.getToken(HisyeoWordParser.Coufon, 0);
	};

	Cixin() {
	    return this.getToken(HisyeoWordParser.Cixin, 0);
	};

	Cifu() {
	    return this.getToken(HisyeoWordParser.Cifu, 0);
	};

	Cihun() {
	    return this.getToken(HisyeoWordParser.Cihun, 0);
	};

	Citse() {
	    return this.getToken(HisyeoWordParser.Citse, 0);
	};

	Cukto() {
	    return this.getToken(HisyeoWordParser.Cukto, 0);
	};

	Cinli() {
	    return this.getToken(HisyeoWordParser.Cinli, 0);
	};

	Cutne() {
	    return this.getToken(HisyeoWordParser.Cutne, 0);
	};

	Cuncion() {
	    return this.getToken(HisyeoWordParser.Cuncion, 0);
	};

	Cunliu() {
	    return this.getToken(HisyeoWordParser.Cunliu, 0);
	};

	Culono() {
	    return this.getToken(HisyeoWordParser.Culono, 0);
	};

	Cudo() {
	    return this.getToken(HisyeoWordParser.Cudo, 0);
	};

	Cufo() {
	    return this.getToken(HisyeoWordParser.Cufo, 0);
	};

	Cungo() {
	    return this.getToken(HisyeoWordParser.Cungo, 0);
	};

	Culosun() {
	    return this.getToken(HisyeoWordParser.Culosun, 0);
	};

	Socok() {
	    return this.getToken(HisyeoWordParser.Socok, 0);
	};

	Sobole() {
	    return this.getToken(HisyeoWordParser.Sobole, 0);
	};

	Somo() {
	    return this.getToken(HisyeoWordParser.Somo, 0);
	};

	Sobis() {
	    return this.getToken(HisyeoWordParser.Sobis, 0);
	};

	Solu() {
	    return this.getToken(HisyeoWordParser.Solu, 0);
	};

	Seloho() {
	    return this.getToken(HisyeoWordParser.Seloho, 0);
	};

	Sityo() {
	    return this.getToken(HisyeoWordParser.Sityo, 0);
	};

	Siufo() {
	    return this.getToken(HisyeoWordParser.Siufo, 0);
	};

	Suoxic() {
	    return this.getToken(HisyeoWordParser.Suoxic, 0);
	};

	Suko() {
	    return this.getToken(HisyeoWordParser.Suko, 0);
	};

	Xokulu() {
	    return this.getToken(HisyeoWordParser.Xokulu, 0);
	};

	Xobo() {
	    return this.getToken(HisyeoWordParser.Xobo, 0);
	};

	Xontun() {
	    return this.getToken(HisyeoWordParser.Xontun, 0);
	};

	Xefizec() {
	    return this.getToken(HisyeoWordParser.Xefizec, 0);
	};

	Xiufu() {
	    return this.getToken(HisyeoWordParser.Xiufu, 0);
	};

	Xiwon() {
	    return this.getToken(HisyeoWordParser.Xiwon, 0);
	};

	Xusten() {
	    return this.getToken(HisyeoWordParser.Xusten, 0);
	};

	Doho() {
	    return this.getToken(HisyeoWordParser.Doho, 0);
	};

	Doicel() {
	    return this.getToken(HisyeoWordParser.Doicel, 0);
	};

	Dokdogo() {
	    return this.getToken(HisyeoWordParser.Dokdogo, 0);
	};

	Doknu() {
	    return this.getToken(HisyeoWordParser.Doknu, 0);
	};

	Dodou() {
	    return this.getToken(HisyeoWordParser.Dodou, 0);
	};

	Dostoc() {
	    return this.getToken(HisyeoWordParser.Dostoc, 0);
	};

	Deko() {
	    return this.getToken(HisyeoWordParser.Deko, 0);
	};

	Denemek() {
	    return this.getToken(HisyeoWordParser.Denemek, 0);
	};

	Di() {
	    return this.getToken(HisyeoWordParser.Di, 0);
	};

	Diyonde() {
	    return this.getToken(HisyeoWordParser.Diyonde, 0);
	};

	Duuhon() {
	    return this.getToken(HisyeoWordParser.Duuhon, 0);
	};

	Dustu() {
	    return this.getToken(HisyeoWordParser.Dustu, 0);
	};

	Dungo() {
	    return this.getToken(HisyeoWordParser.Dungo, 0);
	};

	Dubono() {
	    return this.getToken(HisyeoWordParser.Dubono, 0);
	};

	Zohit() {
	    return this.getToken(HisyeoWordParser.Zohit, 0);
	};

	Zicou() {
	    return this.getToken(HisyeoWordParser.Zicou, 0);
	};

	Zuwobu() {
	    return this.getToken(HisyeoWordParser.Zuwobu, 0);
	};

	Zuto() {
	    return this.getToken(HisyeoWordParser.Zuto, 0);
	};

	Zuyi() {
	    return this.getToken(HisyeoWordParser.Zuyi, 0);
	};

	Boifon() {
	    return this.getToken(HisyeoWordParser.Boifon, 0);
	};

	Bokofoc() {
	    return this.getToken(HisyeoWordParser.Bokofoc, 0);
	};

	Bosol() {
	    return this.getToken(HisyeoWordParser.Bosol, 0);
	};

	Boklon() {
	    return this.getToken(HisyeoWordParser.Boklon, 0);
	};

	Betido() {
	    return this.getToken(HisyeoWordParser.Betido, 0);
	};

	Besol() {
	    return this.getToken(HisyeoWordParser.Besol, 0);
	};

	Belexu() {
	    return this.getToken(HisyeoWordParser.Belexu, 0);
	};

	Besnehot() {
	    return this.getToken(HisyeoWordParser.Besnehot, 0);
	};

	Beudo() {
	    return this.getToken(HisyeoWordParser.Beudo, 0);
	};

	Bemon() {
	    return this.getToken(HisyeoWordParser.Bemon, 0);
	};

	Biek() {
	    return this.getToken(HisyeoWordParser.Biek, 0);
	};

	Bucono() {
	    return this.getToken(HisyeoWordParser.Bucono, 0);
	};

	Buswen() {
	    return this.getToken(HisyeoWordParser.Buswen, 0);
	};

	Fohoso() {
	    return this.getToken(HisyeoWordParser.Fohoso, 0);
	};

	Folun() {
	    return this.getToken(HisyeoWordParser.Folun, 0);
	};

	Fisun() {
	    return this.getToken(HisyeoWordParser.Fisun, 0);
	};

	Fiyuxit() {
	    return this.getToken(HisyeoWordParser.Fiyuxit, 0);
	};

	Fizi() {
	    return this.getToken(HisyeoWordParser.Fizi, 0);
	};

	Fui() {
	    return this.getToken(HisyeoWordParser.Fui, 0);
	};

	Fulkoi() {
	    return this.getToken(HisyeoWordParser.Fulkoi, 0);
	};

	Futsun() {
	    return this.getToken(HisyeoWordParser.Futsun, 0);
	};

	Funbo() {
	    return this.getToken(HisyeoWordParser.Funbo, 0);
	};

	Mokon() {
	    return this.getToken(HisyeoWordParser.Mokon, 0);
	};

	Motsi() {
	    return this.getToken(HisyeoWordParser.Motsi, 0);
	};

	Monodo() {
	    return this.getToken(HisyeoWordParser.Monodo, 0);
	};

	Motsile() {
	    return this.getToken(HisyeoWordParser.Motsile, 0);
	};

	Moniso() {
	    return this.getToken(HisyeoWordParser.Moniso, 0);
	};

	Muncoti() {
	    return this.getToken(HisyeoWordParser.Muncoti, 0);
	};

	Nocido() {
	    return this.getToken(HisyeoWordParser.Nocido, 0);
	};

	Munyufo() {
	    return this.getToken(HisyeoWordParser.Munyufo, 0);
	};

	Niltugu() {
	    return this.getToken(HisyeoWordParser.Niltugu, 0);
	};

	Niwos() {
	    return this.getToken(HisyeoWordParser.Niwos, 0);
	};

	Wofok() {
	    return this.getToken(HisyeoWordParser.Wofok, 0);
	};

	Wedo() {
	    return this.getToken(HisyeoWordParser.Wedo, 0);
	};

	Weilun() {
	    return this.getToken(HisyeoWordParser.Weilun, 0);
	};

	Wekeso() {
	    return this.getToken(HisyeoWordParser.Wekeso, 0);
	};

	Wetodu() {
	    return this.getToken(HisyeoWordParser.Wetodu, 0);
	};

	Wetu() {
	    return this.getToken(HisyeoWordParser.Wetu, 0);
	};

	Weko() {
	    return this.getToken(HisyeoWordParser.Weko, 0);
	};

	Weloi() {
	    return this.getToken(HisyeoWordParser.Weloi, 0);
	};

	Wuitsi() {
	    return this.getToken(HisyeoWordParser.Wuitsi, 0);
	};

	Lobotol() {
	    return this.getToken(HisyeoWordParser.Lobotol, 0);
	};

	Lozic() {
	    return this.getToken(HisyeoWordParser.Lozic, 0);
	};

	Liun() {
	    return this.getToken(HisyeoWordParser.Liun, 0);
	};

	Liubit() {
	    return this.getToken(HisyeoWordParser.Liubit, 0);
	};

	Lufono() {
	    return this.getToken(HisyeoWordParser.Lufono, 0);
	};

	Lunsol() {
	    return this.getToken(HisyeoWordParser.Lunsol, 0);
	};

	Yosten() {
	    return this.getToken(HisyeoWordParser.Yosten, 0);
	};

	Yon() {
	    return this.getToken(HisyeoWordParser.Yon, 0);
	};

	Yundou() {
	    return this.getToken(HisyeoWordParser.Yundou, 0);
	};

	Yunlon() {
	    return this.getToken(HisyeoWordParser.Yunlon, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.enterRawVerbs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.exitRawVerbs(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HisyeoWordParserVisitor ) {
	        return visitor.visitRawVerbs(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class RawNounsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HisyeoWordParser.RULE_rawNouns;
    }

	Oudi() {
	    return this.getToken(HisyeoWordParser.Oudi, 0);
	};

	Okoxu() {
	    return this.getToken(HisyeoWordParser.Okoxu, 0);
	};

	Oksun() {
	    return this.getToken(HisyeoWordParser.Oksun, 0);
	};

	Oklumun() {
	    return this.getToken(HisyeoWordParser.Oklumun, 0);
	};

	Ostok() {
	    return this.getToken(HisyeoWordParser.Ostok, 0);
	};

	Ocuo() {
	    return this.getToken(HisyeoWordParser.Ocuo, 0);
	};

	Oboki() {
	    return this.getToken(HisyeoWordParser.Oboki, 0);
	};

	Obo() {
	    return this.getToken(HisyeoWordParser.Obo, 0);
	};

	Ongolo() {
	    return this.getToken(HisyeoWordParser.Ongolo, 0);
	};

	Onfibi() {
	    return this.getToken(HisyeoWordParser.Onfibi, 0);
	};

	Onwoni() {
	    return this.getToken(HisyeoWordParser.Onwoni, 0);
	};

	Osti() {
	    return this.getToken(HisyeoWordParser.Osti, 0);
	};

	Ozil() {
	    return this.getToken(HisyeoWordParser.Ozil, 0);
	};

	Eloi() {
	    return this.getToken(HisyeoWordParser.Eloi, 0);
	};

	Eleke() {
	    return this.getToken(HisyeoWordParser.Eleke, 0);
	};

	Otsotot() {
	    return this.getToken(HisyeoWordParser.Otsotot, 0);
	};

	Etso() {
	    return this.getToken(HisyeoWordParser.Etso, 0);
	};

	Ebol() {
	    return this.getToken(HisyeoWordParser.Ebol, 0);
	};

	Enkomon() {
	    return this.getToken(HisyeoWordParser.Enkomon, 0);
	};

	Ohel() {
	    return this.getToken(HisyeoWordParser.Ohel, 0);
	};

	Itihos() {
	    return this.getToken(HisyeoWordParser.Itihos, 0);
	};

	Enbukun() {
	    return this.getToken(HisyeoWordParser.Enbukun, 0);
	};

	Istihol() {
	    return this.getToken(HisyeoWordParser.Istihol, 0);
	};

	Isibo() {
	    return this.getToken(HisyeoWordParser.Isibo, 0);
	};

	Isenso() {
	    return this.getToken(HisyeoWordParser.Isenso, 0);
	};

	Isbonxu() {
	    return this.getToken(HisyeoWordParser.Isbonxu, 0);
	};

	Ixolo() {
	    return this.getToken(HisyeoWordParser.Ixolo, 0);
	};

	Ibuwe() {
	    return this.getToken(HisyeoWordParser.Ibuwe, 0);
	};

	Ibole() {
	    return this.getToken(HisyeoWordParser.Ibole, 0);
	};

	Iciwu() {
	    return this.getToken(HisyeoWordParser.Iciwu, 0);
	};

	Ile() {
	    return this.getToken(HisyeoWordParser.Ile, 0);
	};

	Inboli() {
	    return this.getToken(HisyeoWordParser.Inboli, 0);
	};

	Umo() {
	    return this.getToken(HisyeoWordParser.Umo, 0);
	};

	Undofol() {
	    return this.getToken(HisyeoWordParser.Undofol, 0);
	};

	Unbu() {
	    return this.getToken(HisyeoWordParser.Unbu, 0);
	};

	Uyo() {
	    return this.getToken(HisyeoWordParser.Uyo, 0);
	};

	Ucumi() {
	    return this.getToken(HisyeoWordParser.Ucumi, 0);
	};

	Usmon() {
	    return this.getToken(HisyeoWordParser.Usmon, 0);
	};

	Usen() {
	    return this.getToken(HisyeoWordParser.Usen, 0);
	};

	Unfuno() {
	    return this.getToken(HisyeoWordParser.Unfuno, 0);
	};

	Ulonfu() {
	    return this.getToken(HisyeoWordParser.Ulonfu, 0);
	};

	Ulogun() {
	    return this.getToken(HisyeoWordParser.Ulogun, 0);
	};

	Ulzo() {
	    return this.getToken(HisyeoWordParser.Ulzo, 0);
	};

	Hokoli() {
	    return this.getToken(HisyeoWordParser.Hokoli, 0);
	};

	Hoxobe() {
	    return this.getToken(HisyeoWordParser.Hoxobe, 0);
	};

	Hosoun() {
	    return this.getToken(HisyeoWordParser.Hosoun, 0);
	};

	Hondon() {
	    return this.getToken(HisyeoWordParser.Hondon, 0);
	};

	Hoktun() {
	    return this.getToken(HisyeoWordParser.Hoktun, 0);
	};

	Honyo() {
	    return this.getToken(HisyeoWordParser.Honyo, 0);
	};

	Hofezi() {
	    return this.getToken(HisyeoWordParser.Hofezi, 0);
	};

	Holuk() {
	    return this.getToken(HisyeoWordParser.Holuk, 0);
	};

	Holmo() {
	    return this.getToken(HisyeoWordParser.Holmo, 0);
	};

	Henelo() {
	    return this.getToken(HisyeoWordParser.Henelo, 0);
	};

	Hitsu() {
	    return this.getToken(HisyeoWordParser.Hitsu, 0);
	};

	Hismo() {
	    return this.getToken(HisyeoWordParser.Hismo, 0);
	};

	Honcou() {
	    return this.getToken(HisyeoWordParser.Honcou, 0);
	};

	Hiskunco() {
	    return this.getToken(HisyeoWordParser.Hiskunco, 0);
	};

	Hunzidu() {
	    return this.getToken(HisyeoWordParser.Hunzidu, 0);
	};

	Hustun() {
	    return this.getToken(HisyeoWordParser.Hustun, 0);
	};

	Hunsuon() {
	    return this.getToken(HisyeoWordParser.Hunsuon, 0);
	};

	Hulodek() {
	    return this.getToken(HisyeoWordParser.Hulodek, 0);
	};

	Huwu() {
	    return this.getToken(HisyeoWordParser.Huwu, 0);
	};

	Hulu() {
	    return this.getToken(HisyeoWordParser.Hulu, 0);
	};

	Huwuncul() {
	    return this.getToken(HisyeoWordParser.Huwuncul, 0);
	};

	Kolowu() {
	    return this.getToken(HisyeoWordParser.Kolowu, 0);
	};

	Kokoku() {
	    return this.getToken(HisyeoWordParser.Kokoku, 0);
	};

	Kotfusu() {
	    return this.getToken(HisyeoWordParser.Kotfusu, 0);
	};

	Huzon() {
	    return this.getToken(HisyeoWordParser.Huzon, 0);
	};

	Kosmo() {
	    return this.getToken(HisyeoWordParser.Kosmo, 0);
	};

	Komu() {
	    return this.getToken(HisyeoWordParser.Komu, 0);
	};

	Kolmudul() {
	    return this.getToken(HisyeoWordParser.Kolmudul, 0);
	};

	Kistose() {
	    return this.getToken(HisyeoWordParser.Kistose, 0);
	};

	Kiungo() {
	    return this.getToken(HisyeoWordParser.Kiungo, 0);
	};

	Kisko() {
	    return this.getToken(HisyeoWordParser.Kisko, 0);
	};

	Kelos() {
	    return this.getToken(HisyeoWordParser.Kelos, 0);
	};

	Kino() {
	    return this.getToken(HisyeoWordParser.Kino, 0);
	};

	Kinyosel() {
	    return this.getToken(HisyeoWordParser.Kinyosel, 0);
	};

	Kukwon() {
	    return this.getToken(HisyeoWordParser.Kukwon, 0);
	};

	Kuunme() {
	    return this.getToken(HisyeoWordParser.Kuunme, 0);
	};

	Kuon() {
	    return this.getToken(HisyeoWordParser.Kuon, 0);
	};

	Kuocyo() {
	    return this.getToken(HisyeoWordParser.Kuocyo, 0);
	};

	Kuoxi() {
	    return this.getToken(HisyeoWordParser.Kuoxi, 0);
	};

	Kukmut() {
	    return this.getToken(HisyeoWordParser.Kukmut, 0);
	};

	Kusowi() {
	    return this.getToken(HisyeoWordParser.Kusowi, 0);
	};

	Kudu() {
	    return this.getToken(HisyeoWordParser.Kudu, 0);
	};

	Kunonti() {
	    return this.getToken(HisyeoWordParser.Kunonti, 0);
	};

	Kumun() {
	    return this.getToken(HisyeoWordParser.Kumun, 0);
	};

	Kunhiun() {
	    return this.getToken(HisyeoWordParser.Kunhiun, 0);
	};

	Kuncien() {
	    return this.getToken(HisyeoWordParser.Kuncien, 0);
	};

	Kunbi() {
	    return this.getToken(HisyeoWordParser.Kunbi, 0);
	};

	Kuldu() {
	    return this.getToken(HisyeoWordParser.Kuldu, 0);
	};

	Gos() {
	    return this.getToken(HisyeoWordParser.Gos, 0);
	};

	Kulunun() {
	    return this.getToken(HisyeoWordParser.Kulunun, 0);
	};

	Gongoxi() {
	    return this.getToken(HisyeoWordParser.Gongoxi, 0);
	};

	Gonbu() {
	    return this.getToken(HisyeoWordParser.Gonbu, 0);
	};

	Kungiyo() {
	    return this.getToken(HisyeoWordParser.Kungiyo, 0);
	};

	Goyu() {
	    return this.getToken(HisyeoWordParser.Goyu, 0);
	};

	Geko() {
	    return this.getToken(HisyeoWordParser.Geko, 0);
	};

	Gito() {
	    return this.getToken(HisyeoWordParser.Gito, 0);
	};

	Gisgul() {
	    return this.getToken(HisyeoWordParser.Gisgul, 0);
	};

	Gubuyo() {
	    return this.getToken(HisyeoWordParser.Gubuyo, 0);
	};

	Guexo() {
	    return this.getToken(HisyeoWordParser.Guexo, 0);
	};

	Gundole() {
	    return this.getToken(HisyeoWordParser.Gundole, 0);
	};

	Gufoxe() {
	    return this.getToken(HisyeoWordParser.Gufoxe, 0);
	};

	Gudolo() {
	    return this.getToken(HisyeoWordParser.Gudolo, 0);
	};

	Gueyu() {
	    return this.getToken(HisyeoWordParser.Gueyu, 0);
	};

	Gumi() {
	    return this.getToken(HisyeoWordParser.Gumi, 0);
	};

	Gulu() {
	    return this.getToken(HisyeoWordParser.Gulu, 0);
	};

	Tohilok() {
	    return this.getToken(HisyeoWordParser.Tohilok, 0);
	};

	Towe() {
	    return this.getToken(HisyeoWordParser.Towe, 0);
	};

	Tonbokcut() {
	    return this.getToken(HisyeoWordParser.Tonbokcut, 0);
	};

	Toliyo() {
	    return this.getToken(HisyeoWordParser.Toliyo, 0);
	};

	Tolen() {
	    return this.getToken(HisyeoWordParser.Tolen, 0);
	};

	Toliko() {
	    return this.getToken(HisyeoWordParser.Toliko, 0);
	};

	Tolxeto() {
	    return this.getToken(HisyeoWordParser.Tolxeto, 0);
	};

	Tomos() {
	    return this.getToken(HisyeoWordParser.Tomos, 0);
	};

	Toxutsi() {
	    return this.getToken(HisyeoWordParser.Toxutsi, 0);
	};

	Tetek() {
	    return this.getToken(HisyeoWordParser.Tetek, 0);
	};

	Titon() {
	    return this.getToken(HisyeoWordParser.Titon, 0);
	};

	Tixo() {
	    return this.getToken(HisyeoWordParser.Tixo, 0);
	};

	Timiok() {
	    return this.getToken(HisyeoWordParser.Timiok, 0);
	};

	Tubo() {
	    return this.getToken(HisyeoWordParser.Tubo, 0);
	};

	Tundu() {
	    return this.getToken(HisyeoWordParser.Tundu, 0);
	};

	Tulono() {
	    return this.getToken(HisyeoWordParser.Tulono, 0);
	};

	Cokwoli() {
	    return this.getToken(HisyeoWordParser.Cokwoli, 0);
	};

	Comen() {
	    return this.getToken(HisyeoWordParser.Comen, 0);
	};

	Conoi() {
	    return this.getToken(HisyeoWordParser.Conoi, 0);
	};

	Cocko() {
	    return this.getToken(HisyeoWordParser.Cocko, 0);
	};

	Ceo() {
	    return this.getToken(HisyeoWordParser.Ceo, 0);
	};

	Cen() {
	    return this.getToken(HisyeoWordParser.Cen, 0);
	};

	Cino() {
	    return this.getToken(HisyeoWordParser.Cino, 0);
	};

	Cingi() {
	    return this.getToken(HisyeoWordParser.Cingi, 0);
	};

	Ciwindi() {
	    return this.getToken(HisyeoWordParser.Ciwindi, 0);
	};

	Cikinil() {
	    return this.getToken(HisyeoWordParser.Cikinil, 0);
	};

	Cigilsu() {
	    return this.getToken(HisyeoWordParser.Cigilsu, 0);
	};

	Cibon() {
	    return this.getToken(HisyeoWordParser.Cibon, 0);
	};

	Cuskido() {
	    return this.getToken(HisyeoWordParser.Cuskido, 0);
	};

	Cuonwun() {
	    return this.getToken(HisyeoWordParser.Cuonwun, 0);
	};

	Cui() {
	    return this.getToken(HisyeoWordParser.Cui, 0);
	};

	Cundol() {
	    return this.getToken(HisyeoWordParser.Cundol, 0);
	};

	Culci() {
	    return this.getToken(HisyeoWordParser.Culci, 0);
	};

	Culul() {
	    return this.getToken(HisyeoWordParser.Culul, 0);
	};

	Sotnin() {
	    return this.getToken(HisyeoWordParser.Sotnin, 0);
	};

	Sokofu() {
	    return this.getToken(HisyeoWordParser.Sokofu, 0);
	};

	Soden() {
	    return this.getToken(HisyeoWordParser.Soden, 0);
	};

	Solilo() {
	    return this.getToken(HisyeoWordParser.Solilo, 0);
	};

	Sohouk() {
	    return this.getToken(HisyeoWordParser.Sohouk, 0);
	};

	Solwoc() {
	    return this.getToken(HisyeoWordParser.Solwoc, 0);
	};

	Sotun() {
	    return this.getToken(HisyeoWordParser.Sotun, 0);
	};

	Sobo() {
	    return this.getToken(HisyeoWordParser.Sobo, 0);
	};

	Senwic() {
	    return this.getToken(HisyeoWordParser.Senwic, 0);
	};

	Seki() {
	    return this.getToken(HisyeoWordParser.Seki, 0);
	};

	Sekiton() {
	    return this.getToken(HisyeoWordParser.Sekiton, 0);
	};

	Sedu() {
	    return this.getToken(HisyeoWordParser.Sedu, 0);
	};

	Sel() {
	    return this.getToken(HisyeoWordParser.Sel, 0);
	};

	Semoi() {
	    return this.getToken(HisyeoWordParser.Semoi, 0);
	};

	Siskin() {
	    return this.getToken(HisyeoWordParser.Siskin, 0);
	};

	Sinsi() {
	    return this.getToken(HisyeoWordParser.Sinsi, 0);
	};

	Sieto() {
	    return this.getToken(HisyeoWordParser.Sieto, 0);
	};

	Sikin() {
	    return this.getToken(HisyeoWordParser.Sikin, 0);
	};

	Sikot() {
	    return this.getToken(HisyeoWordParser.Sikot, 0);
	};

	Sintokmo() {
	    return this.getToken(HisyeoWordParser.Sintokmo, 0);
	};

	Suhot() {
	    return this.getToken(HisyeoWordParser.Suhot, 0);
	};

	Sukyunik() {
	    return this.getToken(HisyeoWordParser.Sukyunik, 0);
	};

	Sufoun() {
	    return this.getToken(HisyeoWordParser.Sufoun, 0);
	};

	Sundibot() {
	    return this.getToken(HisyeoWordParser.Sundibot, 0);
	};

	Sutuo() {
	    return this.getToken(HisyeoWordParser.Sutuo, 0);
	};

	Suson() {
	    return this.getToken(HisyeoWordParser.Suson, 0);
	};

	Xohofec() {
	    return this.getToken(HisyeoWordParser.Xohofec, 0);
	};

	Sunbidu() {
	    return this.getToken(HisyeoWordParser.Sunbidu, 0);
	};

	Xofo() {
	    return this.getToken(HisyeoWordParser.Xofo, 0);
	};

	Xolu() {
	    return this.getToken(HisyeoWordParser.Xolu, 0);
	};

	Xomutlo() {
	    return this.getToken(HisyeoWordParser.Xomutlo, 0);
	};

	Xifon() {
	    return this.getToken(HisyeoWordParser.Xifon, 0);
	};

	Xemetsen() {
	    return this.getToken(HisyeoWordParser.Xemetsen, 0);
	};

	Xingo() {
	    return this.getToken(HisyeoWordParser.Xingo, 0);
	};

	Xiulo() {
	    return this.getToken(HisyeoWordParser.Xiulo, 0);
	};

	Xixulko() {
	    return this.getToken(HisyeoWordParser.Xixulko, 0);
	};

	Ximu() {
	    return this.getToken(HisyeoWordParser.Ximu, 0);
	};

	Ximol() {
	    return this.getToken(HisyeoWordParser.Ximol, 0);
	};

	Xincuon() {
	    return this.getToken(HisyeoWordParser.Xincuon, 0);
	};

	Xuto() {
	    return this.getToken(HisyeoWordParser.Xuto, 0);
	};

	Xuk() {
	    return this.getToken(HisyeoWordParser.Xuk, 0);
	};

	Xuxok() {
	    return this.getToken(HisyeoWordParser.Xuxok, 0);
	};

	Doi() {
	    return this.getToken(HisyeoWordParser.Doi, 0);
	};

	Doinbi() {
	    return this.getToken(HisyeoWordParser.Doinbi, 0);
	};

	Docui() {
	    return this.getToken(HisyeoWordParser.Docui, 0);
	};

	Donuxin() {
	    return this.getToken(HisyeoWordParser.Donuxin, 0);
	};

	Donus() {
	    return this.getToken(HisyeoWordParser.Donus, 0);
	};

	Deku() {
	    return this.getToken(HisyeoWordParser.Deku, 0);
	};

	Detoi() {
	    return this.getToken(HisyeoWordParser.Detoi, 0);
	};

	Dibo() {
	    return this.getToken(HisyeoWordParser.Dibo, 0);
	};

	Dinci() {
	    return this.getToken(HisyeoWordParser.Dinci, 0);
	};

	Dinzou() {
	    return this.getToken(HisyeoWordParser.Dinzou, 0);
	};

	Dumoko() {
	    return this.getToken(HisyeoWordParser.Dumoko, 0);
	};

	Duuncit() {
	    return this.getToken(HisyeoWordParser.Duuncit, 0);
	};

	Duwoni() {
	    return this.getToken(HisyeoWordParser.Duwoni, 0);
	};

	Zoso() {
	    return this.getToken(HisyeoWordParser.Zoso, 0);
	};

	Zoston() {
	    return this.getToken(HisyeoWordParser.Zoston, 0);
	};

	Zomo() {
	    return this.getToken(HisyeoWordParser.Zomo, 0);
	};

	Zomi() {
	    return this.getToken(HisyeoWordParser.Zomi, 0);
	};

	Zonwul() {
	    return this.getToken(HisyeoWordParser.Zonwul, 0);
	};

	Zowo() {
	    return this.getToken(HisyeoWordParser.Zowo, 0);
	};

	Zoloni() {
	    return this.getToken(HisyeoWordParser.Zoloni, 0);
	};

	Zoli() {
	    return this.getToken(HisyeoWordParser.Zoli, 0);
	};

	Zohun() {
	    return this.getToken(HisyeoWordParser.Zohun, 0);
	};

	Zogoc() {
	    return this.getToken(HisyeoWordParser.Zogoc, 0);
	};

	Zesto() {
	    return this.getToken(HisyeoWordParser.Zesto, 0);
	};

	Zizime() {
	    return this.getToken(HisyeoWordParser.Zizime, 0);
	};

	Zinkon() {
	    return this.getToken(HisyeoWordParser.Zinkon, 0);
	};

	Zixitu() {
	    return this.getToken(HisyeoWordParser.Zixitu, 0);
	};

	Ziziyo() {
	    return this.getToken(HisyeoWordParser.Ziziyo, 0);
	};

	Zuko() {
	    return this.getToken(HisyeoWordParser.Zuko, 0);
	};

	Zusbot() {
	    return this.getToken(HisyeoWordParser.Zusbot, 0);
	};

	Zuhu() {
	    return this.getToken(HisyeoWordParser.Zuhu, 0);
	};

	Zungo() {
	    return this.getToken(HisyeoWordParser.Zungo, 0);
	};

	Zuntulu() {
	    return this.getToken(HisyeoWordParser.Zuntulu, 0);
	};

	Zunlo() {
	    return this.getToken(HisyeoWordParser.Zunlo, 0);
	};

	Boholon() {
	    return this.getToken(HisyeoWordParser.Boholon, 0);
	};

	Bogo() {
	    return this.getToken(HisyeoWordParser.Bogo, 0);
	};

	Bostofis() {
	    return this.getToken(HisyeoWordParser.Bostofis, 0);
	};

	Boxo() {
	    return this.getToken(HisyeoWordParser.Boxo, 0);
	};

	Boboun() {
	    return this.getToken(HisyeoWordParser.Boboun, 0);
	};

	Bolce() {
	    return this.getToken(HisyeoWordParser.Bolce, 0);
	};

	Bokbun() {
	    return this.getToken(HisyeoWordParser.Bokbun, 0);
	};

	Bolfele() {
	    return this.getToken(HisyeoWordParser.Bolfele, 0);
	};

	Bonti() {
	    return this.getToken(HisyeoWordParser.Bonti, 0);
	};

	Beiku() {
	    return this.getToken(HisyeoWordParser.Beiku, 0);
	};

	Belete() {
	    return this.getToken(HisyeoWordParser.Belete, 0);
	};

	Bitun() {
	    return this.getToken(HisyeoWordParser.Bitun, 0);
	};

	Binleo() {
	    return this.getToken(HisyeoWordParser.Binleo, 0);
	};

	Biomu() {
	    return this.getToken(HisyeoWordParser.Biomu, 0);
	};

	Bindu() {
	    return this.getToken(HisyeoWordParser.Bindu, 0);
	};

	Binton() {
	    return this.getToken(HisyeoWordParser.Binton, 0);
	};

	Buswelin() {
	    return this.getToken(HisyeoWordParser.Buswelin, 0);
	};

	Buyencok() {
	    return this.getToken(HisyeoWordParser.Buyencok, 0);
	};

	Budogo() {
	    return this.getToken(HisyeoWordParser.Budogo, 0);
	};

	Bumi() {
	    return this.getToken(HisyeoWordParser.Bumi, 0);
	};

	Buntut() {
	    return this.getToken(HisyeoWordParser.Buntut, 0);
	};

	Bunduki() {
	    return this.getToken(HisyeoWordParser.Bunduki, 0);
	};

	Bulusi() {
	    return this.getToken(HisyeoWordParser.Bulusi, 0);
	};

	Fout() {
	    return this.getToken(HisyeoWordParser.Fout, 0);
	};

	Fonxin() {
	    return this.getToken(HisyeoWordParser.Fonxin, 0);
	};

	Fonolon() {
	    return this.getToken(HisyeoWordParser.Fonolon, 0);
	};

	Folo() {
	    return this.getToken(HisyeoWordParser.Folo, 0);
	};

	Fohon() {
	    return this.getToken(HisyeoWordParser.Fohon, 0);
	};

	Fodoloc() {
	    return this.getToken(HisyeoWordParser.Fodoloc, 0);
	};

	Fecko() {
	    return this.getToken(HisyeoWordParser.Fecko, 0);
	};

	Fenuo() {
	    return this.getToken(HisyeoWordParser.Fenuo, 0);
	};

	Fikwun() {
	    return this.getToken(HisyeoWordParser.Fikwun, 0);
	};

	Filo() {
	    return this.getToken(HisyeoWordParser.Filo, 0);
	};

	Fun() {
	    return this.getToken(HisyeoWordParser.Fun, 0);
	};

	Fuus() {
	    return this.getToken(HisyeoWordParser.Fuus, 0);
	};

	Fukuxi() {
	    return this.getToken(HisyeoWordParser.Fukuxi, 0);
	};

	Fuongok() {
	    return this.getToken(HisyeoWordParser.Fuongok, 0);
	};

	Fuxubin() {
	    return this.getToken(HisyeoWordParser.Fuxubin, 0);
	};

	Motuo() {
	    return this.getToken(HisyeoWordParser.Motuo, 0);
	};

	Mocko() {
	    return this.getToken(HisyeoWordParser.Mocko, 0);
	};

	Funlok() {
	    return this.getToken(HisyeoWordParser.Funlok, 0);
	};

	Mozulis() {
	    return this.getToken(HisyeoWordParser.Mozulis, 0);
	};

	Mozun() {
	    return this.getToken(HisyeoWordParser.Mozun, 0);
	};

	Mongo() {
	    return this.getToken(HisyeoWordParser.Mongo, 0);
	};

	Mokofo() {
	    return this.getToken(HisyeoWordParser.Mokofo, 0);
	};

	Motowo() {
	    return this.getToken(HisyeoWordParser.Motowo, 0);
	};

	Moto() {
	    return this.getToken(HisyeoWordParser.Moto, 0);
	};

	Motifo() {
	    return this.getToken(HisyeoWordParser.Motifo, 0);
	};

	Menyuu() {
	    return this.getToken(HisyeoWordParser.Menyuu, 0);
	};

	Meloc() {
	    return this.getToken(HisyeoWordParser.Meloc, 0);
	};

	Minyo() {
	    return this.getToken(HisyeoWordParser.Minyo, 0);
	};

	Miebil() {
	    return this.getToken(HisyeoWordParser.Miebil, 0);
	};

	Miencok() {
	    return this.getToken(HisyeoWordParser.Miencok, 0);
	};

	Mikdol() {
	    return this.getToken(HisyeoWordParser.Mikdol, 0);
	};

	Mitmo() {
	    return this.getToken(HisyeoWordParser.Mitmo, 0);
	};

	Micin() {
	    return this.getToken(HisyeoWordParser.Micin, 0);
	};

	Mutyu() {
	    return this.getToken(HisyeoWordParser.Mutyu, 0);
	};

	Minyoto() {
	    return this.getToken(HisyeoWordParser.Minyoto, 0);
	};

	Muni() {
	    return this.getToken(HisyeoWordParser.Muni, 0);
	};

	Muesi() {
	    return this.getToken(HisyeoWordParser.Muesi, 0);
	};

	Mukonun() {
	    return this.getToken(HisyeoWordParser.Mukonun, 0);
	};

	Muhoyon() {
	    return this.getToken(HisyeoWordParser.Muhoyon, 0);
	};

	Noo() {
	    return this.getToken(HisyeoWordParser.Noo, 0);
	};

	Nouku() {
	    return this.getToken(HisyeoWordParser.Nouku, 0);
	};

	Noso() {
	    return this.getToken(HisyeoWordParser.Noso, 0);
	};

	Nodu() {
	    return this.getToken(HisyeoWordParser.Nodu, 0);
	};

	Nozi() {
	    return this.getToken(HisyeoWordParser.Nozi, 0);
	};

	Nomu() {
	    return this.getToken(HisyeoWordParser.Nomu, 0);
	};

	Non() {
	    return this.getToken(HisyeoWordParser.Non, 0);
	};

	Nonto() {
	    return this.getToken(HisyeoWordParser.Nonto, 0);
	};

	Noilu() {
	    return this.getToken(HisyeoWordParser.Noilu, 0);
	};

	Muxi() {
	    return this.getToken(HisyeoWordParser.Muxi, 0);
	};

	Neigin() {
	    return this.getToken(HisyeoWordParser.Neigin, 0);
	};

	Nec() {
	    return this.getToken(HisyeoWordParser.Nec, 0);
	};

	Nokso() {
	    return this.getToken(HisyeoWordParser.Nokso, 0);
	};

	Nicu() {
	    return this.getToken(HisyeoWordParser.Nicu, 0);
	};

	Nixin() {
	    return this.getToken(HisyeoWordParser.Nixin, 0);
	};

	Nilol() {
	    return this.getToken(HisyeoWordParser.Nilol, 0);
	};

	Nukulo() {
	    return this.getToken(HisyeoWordParser.Nukulo, 0);
	};

	Nucoto() {
	    return this.getToken(HisyeoWordParser.Nucoto, 0);
	};

	Numuno() {
	    return this.getToken(HisyeoWordParser.Numuno, 0);
	};

	Nuluhu() {
	    return this.getToken(HisyeoWordParser.Nuluhu, 0);
	};

	Wokto() {
	    return this.getToken(HisyeoWordParser.Wokto, 0);
	};

	Wobi() {
	    return this.getToken(HisyeoWordParser.Wobi, 0);
	};

	Wokut() {
	    return this.getToken(HisyeoWordParser.Wokut, 0);
	};

	Nuyo() {
	    return this.getToken(HisyeoWordParser.Nuyo, 0);
	};

	Woloko() {
	    return this.getToken(HisyeoWordParser.Woloko, 0);
	};

	Wowoe() {
	    return this.getToken(HisyeoWordParser.Wowoe, 0);
	};

	Woyu() {
	    return this.getToken(HisyeoWordParser.Woyu, 0);
	};

	Wolik() {
	    return this.getToken(HisyeoWordParser.Wolik, 0);
	};

	Wexon() {
	    return this.getToken(HisyeoWordParser.Wexon, 0);
	};

	Wikse() {
	    return this.getToken(HisyeoWordParser.Wikse, 0);
	};

	Wixonu() {
	    return this.getToken(HisyeoWordParser.Wixonu, 0);
	};

	Wik() {
	    return this.getToken(HisyeoWordParser.Wik, 0);
	};

	Wiluwo() {
	    return this.getToken(HisyeoWordParser.Wiluwo, 0);
	};

	Wuto() {
	    return this.getToken(HisyeoWordParser.Wuto, 0);
	};

	Wibolo() {
	    return this.getToken(HisyeoWordParser.Wibolo, 0);
	};

	Wulus() {
	    return this.getToken(HisyeoWordParser.Wulus, 0);
	};

	Wutun() {
	    return this.getToken(HisyeoWordParser.Wutun, 0);
	};

	Wuot() {
	    return this.getToken(HisyeoWordParser.Wuot, 0);
	};

	Lozido() {
	    return this.getToken(HisyeoWordParser.Lozido, 0);
	};

	Lozo() {
	    return this.getToken(HisyeoWordParser.Lozo, 0);
	};

	Lono() {
	    return this.getToken(HisyeoWordParser.Lono, 0);
	};

	Longi() {
	    return this.getToken(HisyeoWordParser.Longi, 0);
	};

	Lolu() {
	    return this.getToken(HisyeoWordParser.Lolu, 0);
	};

	Leknek() {
	    return this.getToken(HisyeoWordParser.Leknek, 0);
	};

	Lonkin() {
	    return this.getToken(HisyeoWordParser.Lonkin, 0);
	};

	Lexetko() {
	    return this.getToken(HisyeoWordParser.Lexetko, 0);
	};

	Lismu() {
	    return this.getToken(HisyeoWordParser.Lismu, 0);
	};

	Listo() {
	    return this.getToken(HisyeoWordParser.Listo, 0);
	};

	Limien() {
	    return this.getToken(HisyeoWordParser.Limien, 0);
	};

	Libu() {
	    return this.getToken(HisyeoWordParser.Libu, 0);
	};

	Luhu() {
	    return this.getToken(HisyeoWordParser.Luhu, 0);
	};

	Luok() {
	    return this.getToken(HisyeoWordParser.Luok, 0);
	};

	Luicu() {
	    return this.getToken(HisyeoWordParser.Luicu, 0);
	};

	Lucku() {
	    return this.getToken(HisyeoWordParser.Lucku, 0);
	};

	Yokuntik() {
	    return this.getToken(HisyeoWordParser.Yokuntik, 0);
	};

	Yogo() {
	    return this.getToken(HisyeoWordParser.Yogo, 0);
	};

	Yoskinyo() {
	    return this.getToken(HisyeoWordParser.Yoskinyo, 0);
	};

	Yoldun() {
	    return this.getToken(HisyeoWordParser.Yoldun, 0);
	};

	Youxin() {
	    return this.getToken(HisyeoWordParser.Youxin, 0);
	};

	Yocno() {
	    return this.getToken(HisyeoWordParser.Yocno, 0);
	};

	Yone() {
	    return this.getToken(HisyeoWordParser.Yone, 0);
	};

	Yinyunci() {
	    return this.getToken(HisyeoWordParser.Yinyunci, 0);
	};

	Yofuk() {
	    return this.getToken(HisyeoWordParser.Yofuk, 0);
	};

	Yukwoi() {
	    return this.getToken(HisyeoWordParser.Yukwoi, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.enterRawNouns(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.exitRawNouns(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HisyeoWordParserVisitor ) {
	        return visitor.visitRawNouns(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class RawModifiersContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HisyeoWordParser.RULE_rawModifiers;
    }

	Oksios() {
	    return this.getToken(HisyeoWordParser.Oksios, 0);
	};

	Ogoge() {
	    return this.getToken(HisyeoWordParser.Ogoge, 0);
	};

	Osyen() {
	    return this.getToken(HisyeoWordParser.Osyen, 0);
	};

	Otos() {
	    return this.getToken(HisyeoWordParser.Otos, 0);
	};

	Obunyun() {
	    return this.getToken(HisyeoWordParser.Obunyun, 0);
	};

	Ofine() {
	    return this.getToken(HisyeoWordParser.Ofine, 0);
	};

	Omulto() {
	    return this.getToken(HisyeoWordParser.Omulto, 0);
	};

	Oltu() {
	    return this.getToken(HisyeoWordParser.Oltu, 0);
	};

	Osole() {
	    return this.getToken(HisyeoWordParser.Osole, 0);
	};

	Odon() {
	    return this.getToken(HisyeoWordParser.Odon, 0);
	};

	Obok() {
	    return this.getToken(HisyeoWordParser.Obok, 0);
	};

	Elentet() {
	    return this.getToken(HisyeoWordParser.Elentet, 0);
	};

	Efun() {
	    return this.getToken(HisyeoWordParser.Efun, 0);
	};

	Eme() {
	    return this.getToken(HisyeoWordParser.Eme, 0);
	};

	Eleo() {
	    return this.getToken(HisyeoWordParser.Eleo, 0);
	};

	Isbulyol() {
	    return this.getToken(HisyeoWordParser.Isbulyol, 0);
	};

	Infultin() {
	    return this.getToken(HisyeoWordParser.Infultin, 0);
	};

	Ibudu() {
	    return this.getToken(HisyeoWordParser.Ibudu, 0);
	};

	Iwote() {
	    return this.getToken(HisyeoWordParser.Iwote, 0);
	};

	Usundul() {
	    return this.getToken(HisyeoWordParser.Usundul, 0);
	};

	Ilxizuk() {
	    return this.getToken(HisyeoWordParser.Ilxizuk, 0);
	};

	Uklo() {
	    return this.getToken(HisyeoWordParser.Uklo, 0);
	};

	Ubenus() {
	    return this.getToken(HisyeoWordParser.Ubenus, 0);
	};

	Ubolni() {
	    return this.getToken(HisyeoWordParser.Ubolni, 0);
	};

	Ufulit() {
	    return this.getToken(HisyeoWordParser.Ufulit, 0);
	};

	Unbol() {
	    return this.getToken(HisyeoWordParser.Unbol, 0);
	};

	Utok() {
	    return this.getToken(HisyeoWordParser.Utok, 0);
	};

	Usowo() {
	    return this.getToken(HisyeoWordParser.Usowo, 0);
	};

	Umomi() {
	    return this.getToken(HisyeoWordParser.Umomi, 0);
	};

	Uncoi() {
	    return this.getToken(HisyeoWordParser.Uncoi, 0);
	};

	Unidu() {
	    return this.getToken(HisyeoWordParser.Unidu, 0);
	};

	Ulkefi() {
	    return this.getToken(HisyeoWordParser.Ulkefi, 0);
	};

	Hoos() {
	    return this.getToken(HisyeoWordParser.Hoos, 0);
	};

	Ulgukin() {
	    return this.getToken(HisyeoWordParser.Ulgukin, 0);
	};

	Hokuxi() {
	    return this.getToken(HisyeoWordParser.Hokuxi, 0);
	};

	Hokiki() {
	    return this.getToken(HisyeoWordParser.Hokiki, 0);
	};

	Hosin() {
	    return this.getToken(HisyeoWordParser.Hosin, 0);
	};

	Homus() {
	    return this.getToken(HisyeoWordParser.Homus, 0);
	};

	Hondot() {
	    return this.getToken(HisyeoWordParser.Hondot, 0);
	};

	Henonde() {
	    return this.getToken(HisyeoWordParser.Henonde, 0);
	};

	Hiklihos() {
	    return this.getToken(HisyeoWordParser.Hiklihos, 0);
	};

	Helxun() {
	    return this.getToken(HisyeoWordParser.Helxun, 0);
	};

	Hitnodet() {
	    return this.getToken(HisyeoWordParser.Hitnodet, 0);
	};

	Hiyoli() {
	    return this.getToken(HisyeoWordParser.Hiyoli, 0);
	};

	Hizon() {
	    return this.getToken(HisyeoWordParser.Hizon, 0);
	};

	Huunhu() {
	    return this.getToken(HisyeoWordParser.Huunhu, 0);
	};

	Huluko() {
	    return this.getToken(HisyeoWordParser.Huluko, 0);
	};

	Hunsik() {
	    return this.getToken(HisyeoWordParser.Hunsik, 0);
	};

	Hudul() {
	    return this.getToken(HisyeoWordParser.Hudul, 0);
	};

	Kotonhon() {
	    return this.getToken(HisyeoWordParser.Kotonhon, 0);
	};

	Kocko() {
	    return this.getToken(HisyeoWordParser.Kocko, 0);
	};

	Kotilmok() {
	    return this.getToken(HisyeoWordParser.Kotilmok, 0);
	};

	Kobut() {
	    return this.getToken(HisyeoWordParser.Kobut, 0);
	};

	Konxo() {
	    return this.getToken(HisyeoWordParser.Konxo, 0);
	};

	Konwo() {
	    return this.getToken(HisyeoWordParser.Konwo, 0);
	};

	Konbokbo() {
	    return this.getToken(HisyeoWordParser.Konbokbo, 0);
	};

	Kotikol() {
	    return this.getToken(HisyeoWordParser.Kotikol, 0);
	};

	Koxente() {
	    return this.getToken(HisyeoWordParser.Koxente, 0);
	};

	Kodus() {
	    return this.getToken(HisyeoWordParser.Kodus, 0);
	};

	Konen() {
	    return this.getToken(HisyeoWordParser.Konen, 0);
	};

	Kondonse() {
	    return this.getToken(HisyeoWordParser.Kondonse, 0);
	};

	Konyec() {
	    return this.getToken(HisyeoWordParser.Konyec, 0);
	};

	Keskin() {
	    return this.getToken(HisyeoWordParser.Keskin, 0);
	};

	Kexik() {
	    return this.getToken(HisyeoWordParser.Kexik, 0);
	};

	Kiluku() {
	    return this.getToken(HisyeoWordParser.Kiluku, 0);
	};

	Konbo() {
	    return this.getToken(HisyeoWordParser.Konbo, 0);
	};

	Kioso() {
	    return this.getToken(HisyeoWordParser.Kioso, 0);
	};

	Kikolo() {
	    return this.getToken(HisyeoWordParser.Kikolo, 0);
	};

	Kinoxi() {
	    return this.getToken(HisyeoWordParser.Kinoxi, 0);
	};

	Kildo() {
	    return this.getToken(HisyeoWordParser.Kildo, 0);
	};

	Kiyo() {
	    return this.getToken(HisyeoWordParser.Kiyo, 0);
	};

	Kutin() {
	    return this.getToken(HisyeoWordParser.Kutin, 0);
	};

	Kinlik() {
	    return this.getToken(HisyeoWordParser.Kinlik, 0);
	};

	Kuonlon() {
	    return this.getToken(HisyeoWordParser.Kuonlon, 0);
	};

	Kuzou() {
	    return this.getToken(HisyeoWordParser.Kuzou, 0);
	};

	Gosil() {
	    return this.getToken(HisyeoWordParser.Gosil, 0);
	};

	Kuyo() {
	    return this.getToken(HisyeoWordParser.Kuyo, 0);
	};

	Gonzil() {
	    return this.getToken(HisyeoWordParser.Gonzil, 0);
	};

	Golbinus() {
	    return this.getToken(HisyeoWordParser.Golbinus, 0);
	};

	Golfon() {
	    return this.getToken(HisyeoWordParser.Golfon, 0);
	};

	Go() {
	    return this.getToken(HisyeoWordParser.Go, 0);
	};

	Gonyumon() {
	    return this.getToken(HisyeoWordParser.Gonyumon, 0);
	};

	Goluo() {
	    return this.getToken(HisyeoWordParser.Goluo, 0);
	};

	Gowo() {
	    return this.getToken(HisyeoWordParser.Gowo, 0);
	};

	Gemolen() {
	    return this.getToken(HisyeoWordParser.Gemolen, 0);
	};

	Gelmis() {
	    return this.getToken(HisyeoWordParser.Gelmis, 0);
	};

	Gik() {
	    return this.getToken(HisyeoWordParser.Gik, 0);
	};

	Gion() {
	    return this.getToken(HisyeoWordParser.Gion, 0);
	};

	Gufis() {
	    return this.getToken(HisyeoWordParser.Gufis, 0);
	};

	Guso() {
	    return this.getToken(HisyeoWordParser.Guso, 0);
	};

	Gunokol() {
	    return this.getToken(HisyeoWordParser.Gunokol, 0);
	};

	Gulobi() {
	    return this.getToken(HisyeoWordParser.Gulobi, 0);
	};

	Totsi() {
	    return this.getToken(HisyeoWordParser.Totsi, 0);
	};

	Tocit() {
	    return this.getToken(HisyeoWordParser.Tocit, 0);
	};

	Toncoi() {
	    return this.getToken(HisyeoWordParser.Toncoi, 0);
	};

	Tonko() {
	    return this.getToken(HisyeoWordParser.Tonko, 0);
	};

	Tolki() {
	    return this.getToken(HisyeoWordParser.Tolki, 0);
	};

	Tigoyo() {
	    return this.getToken(HisyeoWordParser.Tigoyo, 0);
	};

	Tifulci() {
	    return this.getToken(HisyeoWordParser.Tifulci, 0);
	};

	Tiku() {
	    return this.getToken(HisyeoWordParser.Tiku, 0);
	};

	Tikel() {
	    return this.getToken(HisyeoWordParser.Tikel, 0);
	};

	Tulkolyun() {
	    return this.getToken(HisyeoWordParser.Tulkolyun, 0);
	};

	Tut() {
	    return this.getToken(HisyeoWordParser.Tut, 0);
	};

	Cok() {
	    return this.getToken(HisyeoWordParser.Cok, 0);
	};

	Cosni() {
	    return this.getToken(HisyeoWordParser.Cosni, 0);
	};

	Conzodo() {
	    return this.getToken(HisyeoWordParser.Conzodo, 0);
	};

	Colot() {
	    return this.getToken(HisyeoWordParser.Colot, 0);
	};

	Counton() {
	    return this.getToken(HisyeoWordParser.Counton, 0);
	};

	Cokyen() {
	    return this.getToken(HisyeoWordParser.Cokyen, 0);
	};

	Cot() {
	    return this.getToken(HisyeoWordParser.Cot, 0);
	};

	Comel() {
	    return this.getToken(HisyeoWordParser.Comel, 0);
	};

	Conkok() {
	    return this.getToken(HisyeoWordParser.Conkok, 0);
	};

	Centik() {
	    return this.getToken(HisyeoWordParser.Centik, 0);
	};

	Cenci() {
	    return this.getToken(HisyeoWordParser.Cenci, 0);
	};

	Cenbo() {
	    return this.getToken(HisyeoWordParser.Cenbo, 0);
	};

	Cifulo() {
	    return this.getToken(HisyeoWordParser.Cifulo, 0);
	};

	Cies() {
	    return this.getToken(HisyeoWordParser.Cies, 0);
	};

	Cienxin() {
	    return this.getToken(HisyeoWordParser.Cienxin, 0);
	};

	Cinobu() {
	    return this.getToken(HisyeoWordParser.Cinobu, 0);
	};

	Cinzon() {
	    return this.getToken(HisyeoWordParser.Cinzon, 0);
	};

	Cunyu() {
	    return this.getToken(HisyeoWordParser.Cunyu, 0);
	};

	Cuti() {
	    return this.getToken(HisyeoWordParser.Cuti, 0);
	};

	Cubu() {
	    return this.getToken(HisyeoWordParser.Cubu, 0);
	};

	Cuxien() {
	    return this.getToken(HisyeoWordParser.Cuxien, 0);
	};

	Cunfu() {
	    return this.getToken(HisyeoWordParser.Cunfu, 0);
	};

	Sohou() {
	    return this.getToken(HisyeoWordParser.Sohou, 0);
	};

	Sokol() {
	    return this.getToken(HisyeoWordParser.Sokol, 0);
	};

	Sodolun() {
	    return this.getToken(HisyeoWordParser.Sodolun, 0);
	};

	Sodilu() {
	    return this.getToken(HisyeoWordParser.Sodilu, 0);
	};

	Sobuni() {
	    return this.getToken(HisyeoWordParser.Sobuni, 0);
	};

	Sofin() {
	    return this.getToken(HisyeoWordParser.Sofin, 0);
	};

	Sonkon() {
	    return this.getToken(HisyeoWordParser.Sonkon, 0);
	};

	Sonti() {
	    return this.getToken(HisyeoWordParser.Sonti, 0);
	};

	Sonsus() {
	    return this.getToken(HisyeoWordParser.Sonsus, 0);
	};

	Soltustik() {
	    return this.getToken(HisyeoWordParser.Soltustik, 0);
	};

	Sondonos() {
	    return this.getToken(HisyeoWordParser.Sondonos, 0);
	};

	Selbo() {
	    return this.getToken(HisyeoWordParser.Selbo, 0);
	};

	Siokbi() {
	    return this.getToken(HisyeoWordParser.Siokbi, 0);
	};

	Senzo() {
	    return this.getToken(HisyeoWordParser.Senzo, 0);
	};

	Sinexis() {
	    return this.getToken(HisyeoWordParser.Sinexis, 0);
	};

	Sumon() {
	    return this.getToken(HisyeoWordParser.Sumon, 0);
	};

	Sunbulno() {
	    return this.getToken(HisyeoWordParser.Sunbulno, 0);
	};

	Sunyotni() {
	    return this.getToken(HisyeoWordParser.Sunyotni, 0);
	};

	Suit() {
	    return this.getToken(HisyeoWordParser.Suit, 0);
	};

	Xoinbo() {
	    return this.getToken(HisyeoWordParser.Xoinbo, 0);
	};

	Subol() {
	    return this.getToken(HisyeoWordParser.Subol, 0);
	};

	Xobek() {
	    return this.getToken(HisyeoWordParser.Xobek, 0);
	};

	Xonluk() {
	    return this.getToken(HisyeoWordParser.Xonluk, 0);
	};

	Xowose() {
	    return this.getToken(HisyeoWordParser.Xowose, 0);
	};

	Xolxili() {
	    return this.getToken(HisyeoWordParser.Xolxili, 0);
	};

	Xoboi() {
	    return this.getToken(HisyeoWordParser.Xoboi, 0);
	};

	Xon() {
	    return this.getToken(HisyeoWordParser.Xon, 0);
	};

	Xecinoc() {
	    return this.getToken(HisyeoWordParser.Xecinoc, 0);
	};

	Xentil() {
	    return this.getToken(HisyeoWordParser.Xentil, 0);
	};

	Xisu() {
	    return this.getToken(HisyeoWordParser.Xisu, 0);
	};

	Xiko() {
	    return this.getToken(HisyeoWordParser.Xiko, 0);
	};

	Xidetli() {
	    return this.getToken(HisyeoWordParser.Xidetli, 0);
	};

	Xulmindo() {
	    return this.getToken(HisyeoWordParser.Xulmindo, 0);
	};

	Xiyocu() {
	    return this.getToken(HisyeoWordParser.Xiyocu, 0);
	};

	Dohil() {
	    return this.getToken(HisyeoWordParser.Dohil, 0);
	};

	Dode() {
	    return this.getToken(HisyeoWordParser.Dode, 0);
	};

	Dondun() {
	    return this.getToken(HisyeoWordParser.Dondun, 0);
	};

	Dokcon() {
	    return this.getToken(HisyeoWordParser.Dokcon, 0);
	};

	Didozu() {
	    return this.getToken(HisyeoWordParser.Didozu, 0);
	};

	Dile() {
	    return this.getToken(HisyeoWordParser.Dile, 0);
	};

	Dukwelit() {
	    return this.getToken(HisyeoWordParser.Dukwelit, 0);
	};

	Dusul() {
	    return this.getToken(HisyeoWordParser.Dusul, 0);
	};

	Dundon() {
	    return this.getToken(HisyeoWordParser.Dundon, 0);
	};

	Zomuni() {
	    return this.getToken(HisyeoWordParser.Zomuni, 0);
	};

	Zonubi() {
	    return this.getToken(HisyeoWordParser.Zonubi, 0);
	};

	Zoi() {
	    return this.getToken(HisyeoWordParser.Zoi, 0);
	};

	Zelen() {
	    return this.getToken(HisyeoWordParser.Zelen, 0);
	};

	Zensi() {
	    return this.getToken(HisyeoWordParser.Zensi, 0);
	};

	Zigil() {
	    return this.getToken(HisyeoWordParser.Zigil, 0);
	};

	Ziwit() {
	    return this.getToken(HisyeoWordParser.Ziwit, 0);
	};

	Zingu() {
	    return this.getToken(HisyeoWordParser.Zingu, 0);
	};

	Zilyois() {
	    return this.getToken(HisyeoWordParser.Zilyois, 0);
	};

	Botyoto() {
	    return this.getToken(HisyeoWordParser.Botyoto, 0);
	};

	Botuk() {
	    return this.getToken(HisyeoWordParser.Botuk, 0);
	};

	Bodi() {
	    return this.getToken(HisyeoWordParser.Bodi, 0);
	};

	Bono() {
	    return this.getToken(HisyeoWordParser.Bono, 0);
	};

	Bomoge() {
	    return this.getToken(HisyeoWordParser.Bomoge, 0);
	};

	Bongosi() {
	    return this.getToken(HisyeoWordParser.Bongosi, 0);
	};

	Bonoxo() {
	    return this.getToken(HisyeoWordParser.Bonoxo, 0);
	};

	Bolute() {
	    return this.getToken(HisyeoWordParser.Bolute, 0);
	};

	Bolimot() {
	    return this.getToken(HisyeoWordParser.Bolimot, 0);
	};

	Boyok() {
	    return this.getToken(HisyeoWordParser.Boyok, 0);
	};

	Belisis() {
	    return this.getToken(HisyeoWordParser.Belisis, 0);
	};

	Besu() {
	    return this.getToken(HisyeoWordParser.Besu, 0);
	};

	Bilit() {
	    return this.getToken(HisyeoWordParser.Bilit, 0);
	};

	Bikonte() {
	    return this.getToken(HisyeoWordParser.Bikonte, 0);
	};

	Bicuon() {
	    return this.getToken(HisyeoWordParser.Bicuon, 0);
	};

	Bibok() {
	    return this.getToken(HisyeoWordParser.Bibok, 0);
	};

	Bisu() {
	    return this.getToken(HisyeoWordParser.Bisu, 0);
	};

	Binhun() {
	    return this.getToken(HisyeoWordParser.Binhun, 0);
	};

	Bilus() {
	    return this.getToken(HisyeoWordParser.Bilus, 0);
	};

	But() {
	    return this.getToken(HisyeoWordParser.But, 0);
	};

	Buku() {
	    return this.getToken(HisyeoWordParser.Buku, 0);
	};

	Bunxin() {
	    return this.getToken(HisyeoWordParser.Bunxin, 0);
	};

	Bundu() {
	    return this.getToken(HisyeoWordParser.Bundu, 0);
	};

	Bugot() {
	    return this.getToken(HisyeoWordParser.Bugot, 0);
	};

	Busin() {
	    return this.getToken(HisyeoWordParser.Busin, 0);
	};

	Buihi() {
	    return this.getToken(HisyeoWordParser.Buihi, 0);
	};

	Budiko() {
	    return this.getToken(HisyeoWordParser.Budiko, 0);
	};

	Bulo() {
	    return this.getToken(HisyeoWordParser.Bulo, 0);
	};

	Buslu() {
	    return this.getToken(HisyeoWordParser.Buslu, 0);
	};

	Fonfuk() {
	    return this.getToken(HisyeoWordParser.Fonfuk, 0);
	};

	Fonmot() {
	    return this.getToken(HisyeoWordParser.Fonmot, 0);
	};

	Fogicin() {
	    return this.getToken(HisyeoWordParser.Fogicin, 0);
	};

	Felkono() {
	    return this.getToken(HisyeoWordParser.Felkono, 0);
	};

	Folni() {
	    return this.getToken(HisyeoWordParser.Folni, 0);
	};

	Felcin() {
	    return this.getToken(HisyeoWordParser.Felcin, 0);
	};

	Fildonbun() {
	    return this.getToken(HisyeoWordParser.Fildonbun, 0);
	};

	Fiectu() {
	    return this.getToken(HisyeoWordParser.Fiectu, 0);
	};

	Fiki() {
	    return this.getToken(HisyeoWordParser.Fiki, 0);
	};

	Ficwo() {
	    return this.getToken(HisyeoWordParser.Ficwo, 0);
	};

	Fimosyos() {
	    return this.getToken(HisyeoWordParser.Fimosyos, 0);
	};

	Fitikos() {
	    return this.getToken(HisyeoWordParser.Fitikos, 0);
	};

	Funsut() {
	    return this.getToken(HisyeoWordParser.Funsut, 0);
	};

	Funlit() {
	    return this.getToken(HisyeoWordParser.Funlit, 0);
	};

	Funbetsi() {
	    return this.getToken(HisyeoWordParser.Funbetsi, 0);
	};

	Moskul() {
	    return this.getToken(HisyeoWordParser.Moskul, 0);
	};

	Moziko() {
	    return this.getToken(HisyeoWordParser.Moziko, 0);
	};

	Moxo() {
	    return this.getToken(HisyeoWordParser.Moxo, 0);
	};

	Momoki() {
	    return this.getToken(HisyeoWordParser.Momoki, 0);
	};

	Montuksol() {
	    return this.getToken(HisyeoWordParser.Montuksol, 0);
	};

	Mokwon() {
	    return this.getToken(HisyeoWordParser.Mokwon, 0);
	};

	Mocibo() {
	    return this.getToken(HisyeoWordParser.Mocibo, 0);
	};

	Mefus() {
	    return this.getToken(HisyeoWordParser.Mefus, 0);
	};

	Mofi() {
	    return this.getToken(HisyeoWordParser.Mofi, 0);
	};

	Metlios() {
	    return this.getToken(HisyeoWordParser.Metlios, 0);
	};

	Monbili() {
	    return this.getToken(HisyeoWordParser.Monbili, 0);
	};

	Meduson() {
	    return this.getToken(HisyeoWordParser.Meduson, 0);
	};

	Miou() {
	    return this.getToken(HisyeoWordParser.Miou, 0);
	};

	Mihuon() {
	    return this.getToken(HisyeoWordParser.Mihuon, 0);
	};

	Miteten() {
	    return this.getToken(HisyeoWordParser.Miteten, 0);
	};

	Mistu() {
	    return this.getToken(HisyeoWordParser.Mistu, 0);
	};

	Mile() {
	    return this.getToken(HisyeoWordParser.Mile, 0);
	};

	Muilo() {
	    return this.getToken(HisyeoWordParser.Muilo, 0);
	};

	Mixofo() {
	    return this.getToken(HisyeoWordParser.Mixofo, 0);
	};

	Muun() {
	    return this.getToken(HisyeoWordParser.Muun, 0);
	};

	Mukno() {
	    return this.getToken(HisyeoWordParser.Mukno, 0);
	};

	Mustokin() {
	    return this.getToken(HisyeoWordParser.Mustokin, 0);
	};

	Muncu() {
	    return this.getToken(HisyeoWordParser.Muncu, 0);
	};

	Mulu() {
	    return this.getToken(HisyeoWordParser.Mulu, 0);
	};

	Nokdo() {
	    return this.getToken(HisyeoWordParser.Nokdo, 0);
	};

	Mufeu() {
	    return this.getToken(HisyeoWordParser.Mufeu, 0);
	};

	No() {
	    return this.getToken(HisyeoWordParser.No, 0);
	};

	Nexe() {
	    return this.getToken(HisyeoWordParser.Nexe, 0);
	};

	Nebu() {
	    return this.getToken(HisyeoWordParser.Nebu, 0);
	};

	Nendol() {
	    return this.getToken(HisyeoWordParser.Nendol, 0);
	};

	Neos() {
	    return this.getToken(HisyeoWordParser.Neos, 0);
	};

	Nexodi() {
	    return this.getToken(HisyeoWordParser.Nexodi, 0);
	};

	Nelo() {
	    return this.getToken(HisyeoWordParser.Nelo, 0);
	};

	Nikful() {
	    return this.getToken(HisyeoWordParser.Nikful, 0);
	};

	Niok() {
	    return this.getToken(HisyeoWordParser.Niok, 0);
	};

	Niecni() {
	    return this.getToken(HisyeoWordParser.Niecni, 0);
	};

	Nungo() {
	    return this.getToken(HisyeoWordParser.Nungo, 0);
	};

	Nulto() {
	    return this.getToken(HisyeoWordParser.Nulto, 0);
	};

	Nubuso() {
	    return this.getToken(HisyeoWordParser.Nubuso, 0);
	};

	Nulun() {
	    return this.getToken(HisyeoWordParser.Nulun, 0);
	};

	Wohi() {
	    return this.getToken(HisyeoWordParser.Wohi, 0);
	};

	Wodino() {
	    return this.getToken(HisyeoWordParser.Wodino, 0);
	};

	Wonkuk() {
	    return this.getToken(HisyeoWordParser.Wonkuk, 0);
	};

	Welto() {
	    return this.getToken(HisyeoWordParser.Welto, 0);
	};

	Winit() {
	    return this.getToken(HisyeoWordParser.Winit, 0);
	};

	Wixes() {
	    return this.getToken(HisyeoWordParser.Wixes, 0);
	};

	Wuktomu() {
	    return this.getToken(HisyeoWordParser.Wuktomu, 0);
	};

	Wili() {
	    return this.getToken(HisyeoWordParser.Wili, 0);
	};

	Lohot() {
	    return this.getToken(HisyeoWordParser.Lohot, 0);
	};

	Losol() {
	    return this.getToken(HisyeoWordParser.Losol, 0);
	};

	Londuluk() {
	    return this.getToken(HisyeoWordParser.Londuluk, 0);
	};

	Loc() {
	    return this.getToken(HisyeoWordParser.Loc, 0);
	};

	Legefu() {
	    return this.getToken(HisyeoWordParser.Legefu, 0);
	};

	Lefotol() {
	    return this.getToken(HisyeoWordParser.Lefotol, 0);
	};

	Lionxin() {
	    return this.getToken(HisyeoWordParser.Lionxin, 0);
	};

	Liule() {
	    return this.getToken(HisyeoWordParser.Liule, 0);
	};

	Litiwe() {
	    return this.getToken(HisyeoWordParser.Litiwe, 0);
	};

	Lis() {
	    return this.getToken(HisyeoWordParser.Lis, 0);
	};

	Lito() {
	    return this.getToken(HisyeoWordParser.Lito, 0);
	};

	Luko() {
	    return this.getToken(HisyeoWordParser.Luko, 0);
	};

	Lucik() {
	    return this.getToken(HisyeoWordParser.Lucik, 0);
	};

	Lunti() {
	    return this.getToken(HisyeoWordParser.Lunti, 0);
	};

	Youmok() {
	    return this.getToken(HisyeoWordParser.Youmok, 0);
	};

	Yobe() {
	    return this.getToken(HisyeoWordParser.Yobe, 0);
	};

	Yonlus() {
	    return this.getToken(HisyeoWordParser.Yonlus, 0);
	};

	Youli() {
	    return this.getToken(HisyeoWordParser.Youli, 0);
	};

	Yumon() {
	    return this.getToken(HisyeoWordParser.Yumon, 0);
	};

	Yinsuk() {
	    return this.getToken(HisyeoWordParser.Yinsuk, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.enterRawModifiers(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.exitRawModifiers(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HisyeoWordParserVisitor ) {
	        return visitor.visitRawModifiers(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ConnectorContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HisyeoWordParser.RULE_connector;
    }

	En() {
	    return this.getToken(HisyeoWordParser.En, 0);
	};

	Un() {
	    return this.getToken(HisyeoWordParser.Un, 0);
	};

	Bine() {
	    return this.getToken(HisyeoWordParser.Bine, 0);
	};

	Lekin() {
	    return this.getToken(HisyeoWordParser.Lekin, 0);
	};

	Yodo() {
	    return this.getToken(HisyeoWordParser.Yodo, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.enterConnector(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HisyeoWordParserListener ) {
	        listener.exitConnector(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HisyeoWordParserVisitor ) {
	        return visitor.visitConnector(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




HisyeoWordParser.PostpositionContext = PostpositionContext; 
HisyeoWordParser.PronounContext = PronounContext; 
HisyeoWordParser.RawVerbsContext = RawVerbsContext; 
HisyeoWordParser.RawNounsContext = RawNounsContext; 
HisyeoWordParser.RawModifiersContext = RawModifiersContext; 
HisyeoWordParser.ConnectorContext = ConnectorContext; 
