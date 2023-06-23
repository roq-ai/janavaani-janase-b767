import { IssueInterface } from 'interfaces/issue';
import { JanaSenaInterface } from 'interfaces/jana-sena';
import { GetQueryInterface } from 'interfaces';

export interface ConstituencyInterface {
  id?: string;
  name: string;
  jana_sena_id: string;
  created_at?: any;
  updated_at?: any;
  issue?: IssueInterface[];
  jana_sena?: JanaSenaInterface;
  _count?: {
    issue?: number;
  };
}

export interface ConstituencyGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  jana_sena_id?: string;
}
