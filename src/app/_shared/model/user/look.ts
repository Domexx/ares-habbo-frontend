/*
 * Ares (https://ares.to)
 *
 * @license https://gitlab.com/arescms/ares-frontend/LICENSE (MIT License)
 *
 */

export class LookConfig {
  url: string;
  action: LookAction;
  size: LookSize;
  direction: LookDirection;
  headDirection: LookDirection;
  headOnly: boolean;
  gesture: LookGestures;
}

export enum LookAction {
  'DEFAULT' = 'std',
  'SIT' = 'sit',
  'LAY' = 'lay',
  'WALK' = 'wlk'
}

export enum LookSize {
  'DEFAULT' = 'n',
  'LARGE' = 'l',
  'SMALL' = 's'
}

export enum LookDirection {
  'NORTH_EAST',
  'EAST',
  'SOUTH_EAST',
  'SOUTH',
  'SOUTH_WEST',
  'WEST',
  'NORTH_WEST',
  'NORTH'
}

export enum LookGestures {
  'STANDARD' = 'std',
  'SPEAK'  = 'spk',
  'EYE_BLINK' = 'eyb',
  'SMILE' = 'sml',
  'SAD' = 'sad',
  'SUPRISED' = 'srp',
  'ANGRY' = 'agr'
}
