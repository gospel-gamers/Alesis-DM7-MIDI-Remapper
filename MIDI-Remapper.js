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

// handle incoming MIDI notes
// naming is important

let whatScale = 'dorian'
let whatKey = startingKey["F"]  
let whatOctave = octaveObj["-1"]

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

        // console.log pitch
        // event.trace();

        // send the new changed note
        event.send();
    }
  }