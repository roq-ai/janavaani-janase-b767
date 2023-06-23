import { ConstituencyInterface } from 'interfaces/constituency';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface JanaSenaInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  constituency?: ConstituencyInterface[];
  user?: UserInterface;
  _count?: {
    constituency?: number;
  };
}

export interface JanaSenaGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
