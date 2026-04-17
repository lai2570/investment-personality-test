type Time = 'short' | 'mid' | 'long';
type Level = 'low' | 'mid' | 'high';
type Animal = 'turtle' | 'beaver' | 'bee' | 'fox' | 'dolphin' | 'owl' | 'eagle' | 'wolf' | 'cheetah' | 'sheep';

export function scoreAnimal(time: Time, n: Level, o: Level): Animal {
  if (time === 'short') {
    return o === 'low' ? 'bee' : 'turtle';
  }
  const map: Record<string, Animal> = {
    'mid-low-low': 'dolphin',  'mid-low-mid': 'cheetah', 'mid-low-high': 'eagle',
    'mid-mid-low': 'bee',      'mid-mid-mid': 'bee',     'mid-mid-high': 'fox',
    'mid-high-low': 'turtle',  'mid-high-mid': 'beaver', 'mid-high-high': 'sheep',
    'long-low-low': 'dolphin', 'long-low-mid': 'owl',    'long-low-high': 'wolf',
    'long-mid-low': 'turtle',  'long-mid-mid': 'fox',    'long-mid-high': 'wolf',
    'long-high-low': 'turtle', 'long-high-mid': 'beaver','long-high-high': 'beaver',
  };
  return map[`${time}-${n}-${o}`];
}
