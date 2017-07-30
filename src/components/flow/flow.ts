
import { Transition } from './transition';

export class Flow {
  id: string;
  version: string;
  transitions: Transition[] = [];
}
