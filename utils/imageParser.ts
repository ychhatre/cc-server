import { HttpRequest } from "@aws-sdk/protocol-http";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { Hash } from "@aws-sdk/hash-node";
import { formatUrl } from "@aws-sdk/util-format-url";
import IClub from "../models/club";


async function parseImage(clubID:string, club: IClub) {
	var credentials = {
		accessKeyId: 'AKIAUNBHYZAC3UXGES4R',
		secretAccessKey: '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'
	}
	const s3LogoObjectUrl = parseUrl(`https://club-central.s3.us-east-2.amazonaws.com/${clubID}.jpg`);

        const presigner = new S3RequestPresigner({
          credentials,
          region: "us-east-2",
          sha256: Hash.bind(null, "sha256")
        });

        const logoUrl = formatUrl(await presigner.presign(new HttpRequest(s3LogoObjectUrl)));
	// console.log(logoUrl); 
	club.imageURL = logoUrl; 
	console.log(club); 
	return club; 
}

export { parseImage }; 