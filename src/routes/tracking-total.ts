import type { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { Driver, Helper } from "../services/faunadb";
import type faunadb from "faunadb";
type Client = faunadb.Client;

class TrackingImage {
	
  public q: typeof faunadb.query;
  public client: Client;
  public helper: Helper;
  public secret: string;
  public dev: boolean;

	constructor(
    { secret, dev }: { secret?: string; dev?: boolean } = { dev: true }
  ) {
		if (!secret) this.secret = "fnAD7kp-3IACAtgFGQyYhIT6lWKbw6ejlg0-fSCw";
    else this.secret = secret;
    if (!dev) this.dev = false;
    else this.dev = dev;

    const { q, client } = new Driver(this.secret);
    const h = new Helper({ q, client });
    this.q = q;
    this.client = client;
    this.helper = h;
	}

	async getTrackingCount() {
		return this.helper.GetRecordInCollection<{ref: string, ts: number, data: {github: number}}>('tracking', '284406242377466372')
	}

	addOneToCount(count: number) {
		this.helper.UpdateRecord<{github: number}>('tracking', '284406242377466372', {github: count+1})
	}
}

const tracking = new TrackingImage()

export const get = async (req: ExpressRequest, res: ExpressResponse): Promise<void> => {
	const {data} = await tracking.getTrackingCount()
	res.json({
    "schemaVersion": 1,
    "label": "views",
    "message": data,
    "color": "blue"
  })
};