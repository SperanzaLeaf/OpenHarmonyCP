export interface UniversityInfo {
    id: number;
    nameCN: string;
    douban_rank: number;
    author: string;
    country: string;
    badgeURL: string;
    photoURL: string;
    introduction: string;
}
export const universityInfoData: UniversityInfo[] = [
    {
        id: 0,
        nameCN: "红楼梦",
        douban_rank: 1,
        country: "中国 清代",
        author: "曹雪芹",
        badgeURL: "badges/book.png",
        photoURL: "photos/hlm.jpg",
        introduction: "《红楼梦》是一部百科全书式的长篇小说。以宝黛爱情悲剧为主线，以四大家族的荣辱兴衰为背景，描绘出18世纪中国封建社会的方方面面，以及封建专制下新兴资本主义民主思想的萌动。结构宏大、情节委婉、细节精致，人物形象栩栩如生，声口毕现，堪称中国古代小说中的经 典。由红楼梦研究所校注、人民文学出版社出版的《红楼梦》以庚辰（1760）本《脂砚斋重评石头记》为底本，以甲戌（1754）本、已卯（1759）本、蒙古王府本、戚蓼生序本、舒元炜序本、郑振铎藏本、红楼梦稿本、列宁格勒藏本（俄藏本）、程甲本、程乙本等众多版本为参校本，是一个博采众长、非常适合大众阅读的本子；同时，对底本的重要修改，皆出校记，读者可因以了解《红楼梦》的不同版本状况。红学所的校注本已印行二十五年，其间1994年曾做过一次修订，又十几年过去，2008年推出修订第三版，体现了新的校注成果和科研成果。关于《红楼梦》的作者，原本就有多种说法及推想，“前八十回曹雪芹著、后四十回高鹗续”的说法只是其中之一，这次修订中校注者改为“前八十回曹雪芹著；后四十回无名氏续，程伟元、高鹗整理”，应当是一种更科学的表述，体现了校注者对这一问题的新的认识。现在这个修订后的《红楼梦》是更加完善。"
    },
    {
        id: 1,
        nameCN: "红楼梦",
        douban_rank: 2,
        country: "中国 清代",
        author: "曹雪芹",
        badgeURL: "badges/book.png",
        photoURL: "photos/hlm.jpg",
        introduction: "《红楼梦》是一部百科全书式的长篇小说。以宝黛爱情悲剧为主线，以四大家族的荣辱兴衰为背景，描绘出18世纪中国封建社会的方方面面，以及封建专制下新兴资本主义民主思想的萌动。结构宏大、情节委婉、细节精致，人物形象栩栩如生，声口毕现，堪称中国古代小说中的经 典。由红楼梦研究所校注、人民文学出版社出版的《红楼梦》以庚辰（1760）本《脂砚斋重评石头记》为底本，以甲戌（1754）本、已卯（1759）本、蒙古王府本、戚蓼生序本、舒元炜序本、郑振铎藏本、红楼梦稿本、列宁格勒藏本（俄藏本）、程甲本、程乙本等众多版本为参校本，是一个博采众长、非常适合大众阅读的本子；同时，对底本的重要修改，皆出校记，读者可因以了解《红楼梦》的不同版本状况。红学所的校注本已印行二十五年，其间1994年曾做过一次修订，又十几年过去，2008年推出修订第三版，体现了新的校注成果和科研成果。关于《红楼梦》的作者，原本就有多种说法及推想，“前八十回曹雪芹著、后四十回高鹗续”的说法只是其中之一，这次修订中校注者改为“前八十回曹雪芹著；后四十回无名氏续，程伟元、高鹗整理”，应当是一种更科学的表述，体现了校注者对这一问题的新的认识。现在这个修订后的《红楼梦》是更加完善。"
    }
];
// export function getUniversityInfoByName(nameCN: string) {
//   for (let i = 0; i < universityInfoData.length; i++) {
//     if (universityInfoData[i].nameCN === nameCN) {
//       return universityInfoData[i]
//     }
//   }
// }
export function getUniversityInfoByName(nameCN: string): UniversityInfo | undefined {
    for (let i = 0; i < universityInfoData.length; i++) {
        if (universityInfoData[i].nameCN === nameCN) { // 使用点符号访问属性
            return universityInfoData[i];
        }
    }
    return undefined; // 如果没有找到，则返回 undefined
}
