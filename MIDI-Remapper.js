/*
With Scripter, you can use JavaScript to create your own custom MIDI processing 
effects, including slider controls for real-time interaction.

For detailed information about using Scripter, including code samples, 
see the MIDI plug-ins chapter of the Logic Pro X Effects or 
MainStage 3 Effects manual.
*/

// create object with note values
//  create ability to add a starting key
const startingKey = 
{
    "C": 0,
    "C#": 1,
    "Db": 1,
    "D": 2,
    "D#": 3,
    "Eb": 3,
    "E": 4,
    "F": 5,
    "F#": 6,
    "Gb": 6,
    "G": 7,
    "G#": 8,
    "Ab": 8,
    "A": 9,
    "A#": 10,
    "Bb": 10,
    "B": 11,
}

// octave selector object
const octaveObj =
{
    "-1": -12,
    "0": 0,
    "1": 12,

}

// nums scale degrees
const cNotesNumsObj = 
{
    "1": 60, // root                C
    "b2": 61, // min 2nd            C#
    "2": 62, // maj 2nd             D
    "b3": 63, // min 3rd            D#
    "3": 64, // maj 3rd             E
    "4": 65, // perfect 4th         F
    "b5": 66, // dim 5th            F#
    "5": 67, // perfect fifth       G
    "b6": 68, // minor 6th          G#
    "6": 69, // major 6th           A
    "b7": 70, // minor 7th          A#
    "7": 71, // major 7th           B
    "8": 72, // octave              C (+1)
    "b9": 73, // minor 9th          C# (+1)
    "9": 74, // major 9th           D (+1)
    "b10": 75, // minor 10th        D# (+1)
    "10": 76, // major 10th         E (+1)
    "11": 77, // perfect 11th       F (+1)
    "b12": 78, // dim 12th          F# (+1)
    "12": 79, // perfect 12th       G (+1)
    "b13": 80, // minor 13th        G# (+1)
    "13": 81, // major 13th         A (+1)
    "b14": 82, // minor 14th        A# (+1)
    "14": 83, // major 14th         B (+1)
    "15": 84, // double octave      C (+2)

}

// types of scales

// 7 Church Modes
// Ionian (major)
const cIonianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["3"],
    "middleTom": cNotesNumsObj["4"],
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"],
    "footHighHat": cNotesNumsObj["7"],
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["10"],
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}
// Lydian 
const cLydianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["3"],
    "middleTom": cNotesNumsObj["b5"], // sharp 4th or dim 5th
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"],
    "footHighHat": cNotesNumsObj["7"],
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["10"],
    "ride": cNotesNumsObj["b12"], // sharp 11th or dim 12th
    "crashRight": cNotesNumsObj["12"], 
}
// Mixolydian 
const cMixolydianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["3"],
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"],
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["10"],
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}
// Dorian 
const cDorianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"],
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}
// Aoelian 
const cAoelianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}
// Phrygian 
const cPhrygianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b9"],// minor 9th
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}
// Locrian 
const cLocrianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["b5"], // minor 5th
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["b12"], // minor 12th
}

// extra minor scales
// harmonic minor 
const cHarmonicMinObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th
    "footHighHat": cNotesNumsObj["7"], 
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}
// melodic minor
const cMelodicMinObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"], 
    "footHighHat": cNotesNumsObj["7"], 
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}

// blues scales
// minor Pent Blues
const cPentBluesMinObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b3"], // minor 3rd
    "highTom": cNotesNumsObj["4"], 
    "middleTom": cNotesNumsObj["b5"], // minor 5th 
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["b7"], // minor 7th
    // "footHighHat": cNotesNumsObj["7"], 
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b10"], // minor 10th
    "crashLeft": cNotesNumsObj["11"], 
    "ride": cNotesNumsObj["b12"], // minor 12th
    "crashRight": cNotesNumsObj["12"],
}
// major Pent Blues
const cPentBluesMajObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["b3"], // minor 3rd 
    "middleTom": cNotesNumsObj["3"],  
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"], 
    // "footHighHat": cNotesNumsObj["7"], 
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["b10"], // minor 10th 
    "ride": cNotesNumsObj["10"], 
    "crashRight": cNotesNumsObj["12"],
}

// pentatonic scales
// minor Pent scale
const cPentMinObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b3"], // minor 3rd
    "highTom": cNotesNumsObj["4"],  
    "middleTom": cNotesNumsObj["5"],  
    "lowTom": cNotesNumsObj["b7"], // minor 7th
    "lowTomRim": cNotesNumsObj["8"], 
    // "footHighHat": cNotesNumsObj["7"], 
    // "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b10"], // minor 10th
    "crashLeft": cNotesNumsObj["11"],  
    "ride": cNotesNumsObj["12"], 
    "crashRight": cNotesNumsObj["b14"], // minor 14th
}
// major Pent scale
const cPentMajObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["3"],  
    "middleTom": cNotesNumsObj["5"],  
    "lowTom": cNotesNumsObj["6"], 
    "lowTomRim": cNotesNumsObj["8"], 
    // "footHighHat": cNotesNumsObj["13"], 
    // "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["10"],  
    "ride": cNotesNumsObj["12"], 
    "crashRight": cNotesNumsObj["13"], 
}

// jazz scales
// bebop scales 
const cMajBebopObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["3"],
    "middleTom": cNotesNumsObj["4"],
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th
    "footHighHat": cNotesNumsObj["6"], 
    "highHatClosed": cNotesNumsObj["7"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["10"],
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}
const cMinBebopObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["4"],
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"], 
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}
const cDomBebopObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["3"],
    "middleTom": cNotesNumsObj["4"],
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"], 
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["7"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["10"],
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}
const cDorBebopObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["4"],
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"], 
    "footHighHat": cNotesNumsObj["b7"], // minor 7th  
    "highHatClosed": cNotesNumsObj["8"], 
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}

// super locrian
const cSuperLocrianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["3"], // minor 4th === 3 
    "lowTom": cNotesNumsObj["b5"], // minor 5th
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["10"], // minor 11th === 10
    "crashRight": cNotesNumsObj["b12"], // minor 12th
}

// 9 Tone Scale
const c9ToneObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["3"],
    "lowTom": cNotesNumsObj["b5"], // minor 5th
    "lowTomRim": cNotesNumsObj["5"],
    "footHighHat": cNotesNumsObj["b6"], // minor 7th
    "highHatClosed": cNotesNumsObj["6"],
    "highHatOpen": cNotesNumsObj["7"],
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["10"],
    "crashRight": cNotesNumsObj["b12"], // minor 12th
}

// exotic scales
// algerian
const cAlgerianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["b5"],
    "lowTomRim": cNotesNumsObj["5"],
    "footHighHat": cNotesNumsObj["b6"], // minor 6th
    "highHatClosed": cNotesNumsObj["7"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"],
}
// arabic
const cArabicObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["3"], 
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["b5"], // minor 5th
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["10"], 
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["b12"], // minor 12th
}
// augmented
const cAugmentedObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b3"],
    "highTom": cNotesNumsObj["3"], 
    "middleTom": cNotesNumsObj["5"], 
    "lowTom": cNotesNumsObj["b6"], // minor 6th
    "lowTomRim": cNotesNumsObj["7"], 
    "footHighHat": cNotesNumsObj["14"], 
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b10"], // minor 10th
    "crashLeft": cNotesNumsObj["10"], 
    "ride": cNotesNumsObj["12"],
    "crashRight": cNotesNumsObj["b13"], // minor 13th
}
// balinese
const cBalineseObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["b3"],  // minor 3rd
    "middleTom": cNotesNumsObj["5"], 
    "lowTom": cNotesNumsObj["b6"], // minor 6th
    // "lowTomRim": cNotesNumsObj["7"], 
    "footHighHat": cNotesNumsObj["8"], 
    // "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["b10"], // minor 10th 
    "ride": cNotesNumsObj["12"],
    "crashRight": cNotesNumsObj["b13"], // minor 13th
}
// Byzantine
const cByzantineObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["3"],  
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"], 
    "lowTomRim": cNotesNumsObj["b6"], 
    "footHighHat": cNotesNumsObj["7"], 
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["10"],  
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["12"], 
}
// Chinese
const cChineseObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["3"], 
    "highTom": cNotesNumsObj["b5"],  // minor 5th
    "middleTom": cNotesNumsObj["5"], 
    "lowTom": cNotesNumsObj["7"], 
    "lowTomRim": cNotesNumsObj["8"], 
    // "footHighHat": cNotesNumsObj["8"], 
    // "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["10"], 
    "crashLeft": cNotesNumsObj["b12"], // minor 12th 
    "ride": cNotesNumsObj["12"],
    "crashRight": cNotesNumsObj["14"], 
}
// diminished
const cDimObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["b3"], // minor 3rd 
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["b5"], // minor 5th
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th 
    "footHighHat": cNotesNumsObj["6"], 
    "highHatClosed": cNotesNumsObj["7"],
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["b10"], // minor 10th 
    "ride": cNotesNumsObj["11"],
    "crashRight": cNotesNumsObj["b12"], // minor 12th
}
// dominant diminished
const cDomDimObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["b3"], // minor 3rd 
    "middleTom": cNotesNumsObj["3"], 
    "lowTom": cNotesNumsObj["b5"], // minor 5th
    "lowTomRim": cNotesNumsObj["5"],  
    "footHighHat": cNotesNumsObj["6"], 
    "highHatClosed": cNotesNumsObj["b7"], // minor 7th
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th 
    "crashLeft": cNotesNumsObj["b10"], // minor 10th 
    "ride": cNotesNumsObj["10"],
    "crashRight": cNotesNumsObj["b12"], // minor 12th
}
// Egyptian
const cEgyptianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["4"],  
    "middleTom": cNotesNumsObj["5"], 
    "lowTom": cNotesNumsObj["b7"], // minor 7th
    "lowTomRim": cNotesNumsObj["8"], 
    // "footHighHat": cNotesNumsObj["8"], 
    // "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["11"],  
    "ride": cNotesNumsObj["12"],
    "crashRight": cNotesNumsObj["b14"], // minor 14th
}
// 8 Tone 
const c8ToneObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["3"],
    "lowTom": cNotesNumsObj["4"], 
    "lowTomRim": cNotesNumsObj["b5"], // minor 5th
    "footHighHat": cNotesNumsObj["b6"], // minor 6th
    "highHatClosed": cNotesNumsObj["b7"], // minor 7th
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["10"],
    "crashRight": cNotesNumsObj["11"], 
}
// Enigmatic Minor
const cEnigMinorObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["3"],
    "lowTom": cNotesNumsObj["b5"], // minor 5th
    "lowTomRim": cNotesNumsObj["5"],
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["7"],
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["10"],
    "crashRight": cNotesNumsObj["b12"], // minor 12th
}
// Enigmatic Major
const cEnigMajorObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["3"], 
    "middleTom": cNotesNumsObj["b5"], // minor 5th
    "lowTom": cNotesNumsObj["b6"], // minor 6th
    "lowTomRim": cNotesNumsObj["b7"], // minor 7th
    "footHighHat": cNotesNumsObj["8"], 
    "highHatClosed": cNotesNumsObj["b14"], // minor 14th 
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["10"], 
    "ride": cNotesNumsObj["b12"], // minor 12th
    "crashRight": cNotesNumsObj["b13"], // minor 13th
}
// Ethiopian 
const cEthiopianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["b3"], // minor 3rd 
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"], 
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"], 
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"], 
    "crashRight": cNotesNumsObj["12"], 
}
// Hawaiian
const cHawaiianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["b3"], // minor 3rd 
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"], 
    "lowTomRim": cNotesNumsObj["6"], 
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"], 
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"], 
    "crashRight": cNotesNumsObj["12"], 
}
// Hindu
const cHinduObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["3"], 
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"], 
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"], 
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["10"], 
    "ride": cNotesNumsObj["11"], 
    "crashRight": cNotesNumsObj["12"], 
}
// Hirajoshi
const cHirajoshi =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["5"], 
    "lowTom": cNotesNumsObj["b6"], // minor 6th 
    "lowTomRim": cNotesNumsObj["8"], 
    // "footHighHat": cNotesNumsObj["7"], 
    // "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["b10"], // minor 10th 
    "ride": cNotesNumsObj["12"], 
    "crashRight": cNotesNumsObj["b13"], // minor 13th
}
// HungarianGypsy
const cHungarianGypsyObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["b5"], // minor 5th 
    "lowTom": cNotesNumsObj["5"], 
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th
    "footHighHat": cNotesNumsObj["7"], 
    "highHatClosed": cNotesNumsObj["8"], 
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["b12"], // minor 12th
    "crashRight": cNotesNumsObj["12"], 
}
// HungarianMajor
const cHungarianMajorObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b3"], // minor 3rd
    "highTom": cNotesNumsObj["3"], 
    "middleTom": cNotesNumsObj["b5"], // minor 5th 
    "lowTom": cNotesNumsObj["5"], 
    "lowTomRim": cNotesNumsObj["6"], 
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"], 
    "highHatOpen": cNotesNumsObj["b10"], // minor 10th
    "crashLeft": cNotesNumsObj["10"], 
    "ride": cNotesNumsObj["b12"], // minor 12th
    "crashRight": cNotesNumsObj["12"], 
}
// Iberian
const cIberianObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["3"], 
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"], 
    "lowTomRim": cNotesNumsObj["b7"], // minor 7th 
    // "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"], 
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["10"], 
    "ride": cNotesNumsObj["11"], 
    "crashRight": cNotesNumsObj["12"], 
}
// Iwato
const cIwato =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["4"], 
    "middleTom": cNotesNumsObj["b5"], // minor 5th 
    "lowTom": cNotesNumsObj["b7"], // minor 7th
    "lowTomRim": cNotesNumsObj["8"], 
    // "footHighHat": cNotesNumsObj["7"], 
    // "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["11"], 
    "ride": cNotesNumsObj["b12"], // minor 12th
    "crashRight": cNotesNumsObj["b14"], // minor 14th
}
// Japanese
const cJapanese =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["4"], 
    "middleTom": cNotesNumsObj["5"], 
    "lowTom": cNotesNumsObj["b7"], // minor 7th
    "lowTomRim": cNotesNumsObj["8"], 
    // "footHighHat": cNotesNumsObj["7"], 
    // "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["11"], 
    "ride": cNotesNumsObj["12"], 
    "crashRight": cNotesNumsObj["b14"], // minor 14th
}
// Lydian Dominant
const cLydianDomObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["3"],
    "middleTom": cNotesNumsObj["b5"], // sharp 4th or dim 5th
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"],
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"],
    "crashLeft": cNotesNumsObj["10"],
    "ride": cNotesNumsObj["b12"], // sharp 11th or dim 12th
    "crashRight": cNotesNumsObj["12"], 
}
// Octatonic
const cOctatonicObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"],
    "lowTomRim": cNotesNumsObj["6"],
    "footHighHat": cNotesNumsObj["7"], 
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["11"], 
    "crashRight": cNotesNumsObj["12"], 
}
// Oriental
const cOrientalObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd
    "highTom": cNotesNumsObj["3"], 
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["b5"], // minor 5th
    "lowTomRim": cNotesNumsObj["6"],
    "footHighHat": cNotesNumsObj["b7"], // minor 7th 
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["10"], 
    "ride": cNotesNumsObj["11"], 
    "crashRight": cNotesNumsObj["b12"], // minor 12th
}
// Prometheus
const cPrometheusObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["3"], 
    "middleTom": cNotesNumsObj["b5"], // minor 5th 
    "lowTom": cNotesNumsObj["6"], 
    "lowTomRim": cNotesNumsObj["b7"], // minor 7th
    "footHighHat": cNotesNumsObj["b14"], // minor 14th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["10"], 
    "ride": cNotesNumsObj["b12"], // minor 12th
    "crashRight": cNotesNumsObj["13"], 
}
// Romanian Minor
const cRomanianMinorObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["b3"], // minor 3rd
    "middleTom": cNotesNumsObj["b5"], // minor 5th 
    "lowTom": cNotesNumsObj["5"], 
    "lowTomRim": cNotesNumsObj["6"], 
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["b10"], // minor 10th
    "ride": cNotesNumsObj["b12"], // minor 12th
    "crashRight": cNotesNumsObj["12"], 
}
// SpanishGypsy
const cSpanishGypsyObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["b2"], // minor 2nd 
    "highTom": cNotesNumsObj["3"], 
    "middleTom": cNotesNumsObj["4"], 
    "lowTom": cNotesNumsObj["5"], 
    "lowTomRim": cNotesNumsObj["b6"], // minor 6th 
    "footHighHat": cNotesNumsObj["b7"], // minor 7th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["b9"], // minor 9th
    "crashLeft": cNotesNumsObj["10"], 
    "ride": cNotesNumsObj["11"], 
    "crashRight": cNotesNumsObj["12"], 
}
// WholeTones
const cWholeTonesObj =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"], 
    "highTom": cNotesNumsObj["3"], 
    "middleTom": cNotesNumsObj["b5"], // minor 5th
    "lowTom": cNotesNumsObj["b6"],  // minor 6th
    "lowTomRim": cNotesNumsObj["b7"], // minor 6th 
    "footHighHat": cNotesNumsObj["b14"], // minor 14th
    "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["10"], 
    "ride": cNotesNumsObj["b12"], // minor 12th
    "crashRight": cNotesNumsObj["b13"], // minor 13th
}
// Yo
const cYo =
{
    "kick": cNotesNumsObj["1"],
    "snare": cNotesNumsObj["2"],
    "highTom": cNotesNumsObj["4"], 
    "middleTom": cNotesNumsObj["5"], 
    "lowTom": cNotesNumsObj["6"], 
    "lowTomRim": cNotesNumsObj["8"], 
    // "footHighHat": cNotesNumsObj["7"], 
    // "highHatClosed": cNotesNumsObj["8"],
    "highHatOpen": cNotesNumsObj["9"], 
    "crashLeft": cNotesNumsObj["11"], 
    "ride": cNotesNumsObj["12"], 
    "crashRight": cNotesNumsObj["13"], 
}


// handle incoming MIDI notes
// naming is important

let whatScale = 'dorian'
let whatKey = startingKey["F"]  
let whatOctave = octaveObj["-1"]

// set to keep track of active notes
const activeNotes = new Set();

function HandleMIDI(event) {

    // find matching notes and change them
    if (event instanceof NoteOn) {

        let determineScaleObj = {}
        
        // maybe change this block to a large ternary expression ...?
        if (whatScale === 'lydian') {
            determineScaleObj = cLydianObj
        } else if (whatScale === 'mixolydian') {
            determineScaleObj = cMixolydianObj
        } else if (whatScale === 'dorian') {
            determineScaleObj = cDorianObj
        } else if (whatScale === 'aeolian') {
            determineScaleObj = cAoelianObj
        } else if (whatScale === 'phrygian') {
            determineScaleObj = cPhrygianObj
        } else if (whatScale === 'locrian') {
            determineScaleObj = cLocrianObj
        } else if (whatScale === 'ionian'){
            determineScaleObj = cIonianObj
        } else if (whatScale === 'harmMin') {
            determineScaleObj = cHarmonicMinObj
        } else if (whatScale === 'melodMin') {
            determineScaleObj = cMelodicMinObj
        } else if (whatScale === 'pentMinBlues') {
            determineScaleObj = cPentBluesMinObj
        } else if (whatScale === 'pentMajBlues') {
            determineScaleObj = cPentBluesMajObj
        } else if (whatScale === 'pentMin') {
            determineScaleObj = cPentMinObj
        } else if (whatScale === 'pentMaj') {
            determineScaleObj = cPentMajObj
        } else if (whatScale === 'majBebob') {
            determineScaleObj = cMajBebopObj
        } else if (whatScale === 'minBebob') {
            determineScaleObj = cMinBebopObj
        } else if (whatScale === 'domBebob') {
            determineScaleObj = cDomBebopObj
        } else if (whatScale === 'dorBebob') {
            determineScaleObj = cDorBebopObj
        } else if (whatScale === 'supLocrian') {
            determineScaleObj = cSuperLocrianObj
        } else if (whatScale === '9Tone') {
            determineScaleObj = c9ToneObj
        } else if (whatScale === 'algerian') {
            determineScaleObj = cAlgerianObj
        } else if (whatScale === 'arabic') {
            determineScaleObj = cArabicObj
        } else if (whatScale === 'augmented') {
            determineScaleObj = cAugmentedObj
        } else if (whatScale === 'balinese') {
            determineScaleObj = cBalineseObj
        } else if (whatScale === 'byzantine') {
            determineScaleObj = cByzantineObj
        } else if (whatScale === 'chinese') {
            determineScaleObj = cChineseObj
        } else if (whatScale === 'dim') {
            determineScaleObj = cDimObj
        } else if (whatScale === 'domDim') {
            determineScaleObj = cDomDimObj
        } else if (whatScale === 'egyptian') {
            determineScaleObj = cEgyptianObj
        } else if (whatScale === '8Tone') {
            determineScaleObj = c8ToneObj
        } else if (whatScale === 'enigMin') {
            determineScaleObj = cEnigMinorObj
        } else if (whatScale === 'enigMja') {
            determineScaleObj = cEnigMajorObj
        } else if (whatScale === 'ethiopian') {
            determineScaleObj = cEthiopianObj
        } else if (whatScale === 'hawaiian') {
            determineScaleObj = cHawaiianObj
        } else if (whatScale === 'hindu') {
            determineScaleObj = cHinduObj
        } else if (whatScale === 'hirajoshi') {
            determineScaleObj = cHirajoshi
        } else if (whatScale === 'hungGypsy') {
            determineScaleObj = cHungarianGypsyObj
        } else if (whatScale === 'hungMaj') {
            determineScaleObj = cHungarianMajorObj
        } else if (whatScale === 'iberian') {
            determineScaleObj = cIberianObj
        } else if (whatScale === 'iwato') {
            determineScaleObj = cIwato
        } else if (whatScale === 'japanese') {
            determineScaleObj = cJapanese
        } else if (whatScale === 'lydDom') {
            determineScaleObj = cLydianDomObj
        } else if (whatScale === 'octa') {
            determineScaleObj = cOctatonicObj
        } else if (whatScale === 'oriental') {
            determineScaleObj = cOrientalObj
        } else if (whatScale === 'prometheus') {
            determineScaleObj = cPrometheusObj
        } else if (whatScale === 'romMin') {
            determineScaleObj = cRomanianMinorObj
        } else if (whatScale === 'spanGypsy') {
            determineScaleObj = cSpanishGypsyObj
        } else if (whatScale === 'wholeTone') {
            determineScaleObj = cWholeTonesObj
        } else if (whatScale === 'yo') {
            determineScaleObj = cYo
        } else {
            determineScaleObj = cIonianObj
        }

        // place the correct notes into their spots
        switch (event.pitch) {
            case 36:
                // kick
                // Change the note from 'C1' to 'C3'
                event.pitch = determineScaleObj["kick"]
                break
            case 38:
                // snare
                // Change the note from 'D1' to appropriate note
                event.pitch = determineScaleObj["snare"];
                break
            case 48:
                // high tom
                // Change the note from 'C2' to appropriate note'
                event.pitch = determineScaleObj["highTom"]
                break;
            case 45:
                // middle tom
                // Change the note from 'A1' to appropriate note
                event.pitch = determineScaleObj["middleTom"]
                break
            case 43:
                // low tom
                // Change the note from 'G1' to appropriate note
                event.pitch = determineScaleObj["lowTom"]
                break
            case 58:
                // snare rim
                // Change the note from 'A#2' to appropriate note'
                event.pitch = determineScaleObj["lowTomRim"]
                break
            case 44:
                // hi hat foot
                // Change the note from 'G#1' to appropriate note'
                event.pitch = determineScaleObj["footHighHat"]
                break
            case 42:
                // hat closed (while holding foot)
                // Change the note from 'F#1' to appropriate note
                event.pitch = determineScaleObj["highHatClosed"]
                break
            case 46:
                // hat open
                // Change the note from 'A#1' to appropriate note
                event.pitch = determineScaleObj["highHatOpen"]
                break
            case 49:
                // Crash left
                // Change the note from 'C#2' to appropriate note'
                event.pitch = determineScaleObj["crashLeft"]
                break
            case 57:
                // Ride
                // Change the note from 'A2' to appropriate note
                event.pitch = determineScaleObj["ride"]
                break
            case 41:
                // Crash right
                // Change the note from 'F1' to appropriate note
                event.pitch = determineScaleObj["crashRight"]
                break
            default:
              console.log('not a valid note')
        }

        // add key selection
        event.pitch += whatKey

        // add octave selection
        event.pitch += whatOctave
        
        // adjust velocity (increase by 35%)
        event.velocity = Math.min(127, Math.round(event.velocity * 1.35));
        
        // Add the note to the set of active notes
        activeNotes.add(event.pitch);

        // console.log pitch
        // event.trace();

        // send the new changed note
        event.send();
        
    } else if (event instanceof NoteOff) {
        // Check if the released note was previously triggered (is in the activeNotes set)
        if (activeNotes.has(event.pitch)) {
        
        // console.log(activeNotes);
            
            // Send a corresponding NoteOff event to stop the note
            const noteOffEvent = new NoteOff();
            noteOffEvent.pitch = event.pitch;
            noteOffEvent.velocity = 64; // You can adjust the velocity if needed
            
            // noteOffEvent.trace();
            noteOffEvent.send();

            // Remove the note from the set of active notes
            activeNotes.delete(event.pitch);
        }
    }
  }
