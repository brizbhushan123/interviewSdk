// jest.setup.ts
import { SessionInfo } from "./src/core/AuthenticatorManager";
import ThinkProctor from "./src/index";

import * as fs from 'fs'; // Import Node.js file system module
import * as path from 'path'; // Import Node.js path module
 

const _mockSpeechSynthesis:SpeechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getVoices: jest.fn(() => []),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent:jest.fn(),
  onvoiceschanged: jest.fn(),
  pending: false,
  speaking: false,
  paused: false,
} 

 

const utteranceMock = {
    text: '',
    voice: null,
    volume: 1,
    rate: 1,
    pitch: 1,
    lang: '',
    onstart: null,
    onend: null,
    onerror: null,
    onpause: null,
    onresume: null,
    onboundary: null,
    onmark: null,
}


declare global {
  var mockFetch: jest.Mock; // Declare global variable for fetch mock
  var mockSdkCallback: jest.Mock<typeof ThinkProctor>; // Declare global for SDK init callback
  var sessionToken:SessionInfo;
  var htmlTemplate: string; // Declare a variable to hold the read HTML content
  var templateJson:string;
  var mockSpeechSynthesis: typeof _mockSpeechSynthesis; 
  var sessionResponse: any; // Declare a variable to hold the session response 


  // Add other global mocks as needed
}

// Assign the actual Jest mock functions to the global variables
global.mockFetch = jest.fn();
global.mockSdkCallback = jest.fn(); 

// Create the mock object that will represent window.speechSynthesis

global.mockSpeechSynthesis = _mockSpeechSynthesis;
global.SpeechSynthesisUtterance = jest.fn().mockImplementation((text) => {
  utteranceMock.text = text;
  return utteranceMock;
});


// global.mockCanvasContext = _mockCanvasContext;




// --- Configure Global fetch Mock (runs once per environment setup) ---
beforeAll(() => {
 
  Object.defineProperty(window, 'speechSynthesis', {
    writable: true,        // Allows tests to potentially reassign it if needed
    configurable: true,    // Allows the property to be deleted or reconfigured
    value: global.mockSpeechSynthesis, // Assign your mock object here
  });  
   // Define window.speechSynthesis to be our mock object 


  // You might also want to mock SpeechSynthesisUtterance if your code creates them
  // For simplicity, we're not mocking the constructor directly here,
  // but if your code checks `instanceof SpeechSynthesisUtterance`, you'd need this:
  Object.defineProperty(window, 'SpeechSynthesisUtterance', {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation((text) => ({
      text: text,
      // Add other properties of SpeechSynthesisUtterance if your code uses them
      // e.g., volume, rate, pitch, voice, onend, onerror
    })),
  });
  
  // Ensure global.fetch is our mock before any test files are loaded
  Object.defineProperty(global, 'fetch', {
    writable: true,
    configurable: true,
    value: global.mockFetch,
  });
  global.fetch = global.mockFetch;


  const filePath = path.join(__dirname, 'dist/page.html');
  try {
    // Read the file synchronously. It returns a Buffer, so convert to string.
    global.htmlTemplate = fs.readFileSync(filePath, 'utf8');
    console.log('Successfully read HTML template from file. Length:', global.htmlTemplate.length);
    // console.log('HTML content preview:', htmlTemplate.substring(0, 100), '...'); // For debugging
  } catch (error) {
    console.error('Failed to read HTML template file:', error);
    // If the file can't be read, tests won't run correctly, so throw an error
    throw error;
  }


  const filePathJson = path.join(__dirname, 'dist/lang/en.json');
  try {
    // Read the file synchronously. It returns a Buffer, so convert to string.
    global.templateJson = fs.readFileSync(filePathJson, 'utf8');
    console.log('Successfully read Json from file. Length:', global.templateJson.length);
    // console.log('HTML content preview:', htmlTemplate.substring(0, 100), '...'); // For debugging
  } catch (error) {
    console.error('Failed to read JSON file:', error);
    // If the file can't be read, tests won't run correctly, so throw an error
    throw error;
  }


  jest.useFakeTimers();
});

// --- Common SDK Initialization and Mock Clearing (runs before each test) ---
beforeEach(async () => {

    // Clear calls on your mock canvas context methods for each test
//   global.mockCanvasContext.fillRect.mockClear();
//   global.mockCanvasContext.clearRect.mockClear();
//   global.mockCanvasContext.drawImage.mockClear();
    // 1. Clear call history and reset mock implementations for SpeechSynthesis methods
  (global.mockSpeechSynthesis.speak as jest.Mock).mockClear(); // Explicitly cast
  (global.mockSpeechSynthesis.cancel as jest.Mock).mockClear(); // Explicitly cast
  (global.mockSpeechSynthesis.pause as jest.Mock).mockClear(); // Explicitly cast
  (global.mockSpeechSynthesis.resume as jest.Mock).mockClear(); // Explicitly cast
  (global.mockSpeechSynthesis.getVoices as jest.Mock).mockClear(); // Explicitly cast
  (global.mockSpeechSynthesis.onvoiceschanged as jest.Mock).mockClear(); // THIS IS THE FIX


  // 2. Reset mutable properties of the mock object to a clean state for each test
  (global.mockSpeechSynthesis as any).speaking = false;
  (global.mockSpeechSynthesis as any).paused = false;
  (global.mockSpeechSynthesis as any).pending = false;

  // 3. Clear SpeechSynthesisUtterance constructor calls
  (window.SpeechSynthesisUtterance as jest.Mock).mockClear();


  document.body.innerHTML = `<div id="app"></div>`;
  const mockSessionData = {
    "status": true,
    "code": 2300,
    "message": "Login successful",
    "data": {
        "session_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InNlc3Npb25JZCI6MzE1Niwic2Vzc0luc3RhbmNlSWQiOjM2MDB9LCJjbGllbnRJZCI6MjAwMSwicm9sZSI6ImNhbmRpZGF0ZSIsImlhdCI6MTc1MTYxNTEwOH0.G9rPNLhM5ZgmcgH5azfDhc4bUrMOZA92B0SxVhcMbNw",
        "assign_status": false,
        "assign_proctor": "",
        "proctor_list": [],
        "ai_frame_rate": null,
        "ufm_capture_time": null,
        "ufm_sub_type": [
            {
                "id": 1,
                "name": "person"
            },
            {
                "id": 2,
                "name": "chair"
            },
            {
                "id": 3,
                "name": "tv-monitor"
            },
            {
                "id": 4,
                "name": "laptop"
            },
            {
                "id": 5,
                "name": "cell phone"
            },
            {
                "id": 6,
                "name": "book"
            },
            {
                "id": 7,
                "name": "headphone"
            },
            {
                "id": 8,
                "name": "earphone- neckband"
            },
            {
                "id": 9,
                "name": "earphone- true_wireless"
            },
            {
                "id": 10,
                "name": "earphone- wired"
            },
            {
                "id": 11,
                "name": "ring"
            },
            {
                "id": 12,
                "name": "watch"
            }
        ],
        "config": "eyJ1cmwiOiJodHRwczpcL1wvdGhpbmtzdWl0ZS5sb2NhbC5jb20iLCJzaWduYWxfbm9kZV91cmwiOiJodHRwczpcL1wvdGhpbmtzdWl0ZS5sb2NhbC5jb20iLCJyZWNvcmRpbmdfbm9kZV91cmwiOiJodHRwczpcL1wvdGhpbmtzdWl0ZS5sb2NhbC5jb20iLCJ0dXJuX3VybCI6Imh0dHBzOlwvXC90aGlua3N1aXRlLmxvY2FsLmNvbSIsInN0dW5fdXJsIjoiaHR0cHM6XC9cL3RoaW5rc3VpdGUubG9jYWwuY29tIiwidHVybl91c2VybmFtZSI6Imh0dHBzOlwvXC90aGlua3N1aXRlLmxvY2FsLmNvbSIsInR1cm5fcGFzc3dvcmQiOiJodHRwczpcL1wvdGhpbmtzdWl0ZS5sb2NhbC5jb20iLCJzdHVuX3VzZXJuYW1lIjoiaHR0cHM6XC9cL3RoaW5rc3VpdGUubG9jYWwuY29tIiwic3R1bl9wYXNzd29yZCI6Imh0dHBzOlwvXC90aGlua3N1aXRlLmxvY2FsLmNvbSIsImVudiI6ImxvY2FsIiwic3BlZWNoVVJMIjoiaHR0cHM6XC9cL3NwZWVjaC5nb29nbGVhcGlzLmNvbVwvdjFcL3NwZWVjaDpyZWNvZ25pemU\/a2V5PUFJemFTeUJPdGk0bU0tNng5V0RuWklqSWV5RVUyMU9wQlhxV0JndyJ9",
        "language": "en",
        "socketUserName": "local_2001_C_3156",
        "template": {
            "template_name": {
                "value": "Dummy Template"
            },
            "template_code": {
                "value": "TEMP002"
            },
            "device_support": {
                "value": 1
            },
            "proctoring_mode": {
                "value": 1
            },
            "monitoring_setup": {
                "value": 0
            },
            "strictness_enabled": {
                "value": 1
            },
            "session_recording": {
                "value": 1,
                "data": {
                    "session_recording_type": {
                        "value": 1,
                        "data": [],
                        "image_capture_interval": 10
                    },
                    "screen_share": {
                        "value": 0
                    }
                }
            },
            "smart_proctor_enabled": {
                "value": 0
            },
            "speaker_check": {
                "value": 0,
                "data": {
                    "speaker_check_attempt": {
                        "value": 0
                    }
                }
            },
            "candidate_authentication": {
                "value": 1,
                "data": {
                    "capture_id_enabled": {
                        "value": 1
                    },
                    "auth_reg_photo": {
                        "value": 1
                    },
                    "auth_reg_id": {
                        "value": 1
                    },
                    "auth_capture_id": {
                        "value": 1
                    },
                    "ai_revoke_face_capture": {
                        "value": 1
                    },
                    "ai_revoke_face_capture_attempt": {
                        "value": 3
                    },
                    "human_validation": {
                        "value": 0
                    }
                }
            },
            "room_sanitization_enabled": {
                "value": 1,
                "data": {
                    "ai_revoke_room_san": {
                        "value": 1
                    },
                    "ai_revoke_room_san_attempt": {
                        "value": 3
                    }
                }
            },
            "additional_cam": {
                "value": 1,
                "data": {
                    "ai_enable": {
                        "value": 1,
                        "data": {
                            "ai_front_view_cam": 1,
                            "ai_side_view_cam": 1,
                            "ai_back_view_cam": 1
                        }
                    },
                    "live_custom_cam": {
                        "value": 0,
                        "data": {
                            "live_custom_cam_ins": ""
                        }
                    }
                }
            },
            "failure_threshold": {
                "value": 50
            },
            "suspicious_threshold": {
                "value": 30
            },
            "ufm": {
                "data": {
                    "FM": {
                        "value": 1,
                        "data": {
                            "id": 1,
                            "ufm_name": "Face Mismatch",
                            "ufm_desc": "Face Mismatch",
                            "is_active": 1,
                            "accuracy": 1,
                            "escalation_count": 0,
                            "score_deducted": 0
                        }
                    },
                    "MFD": {
                        "value": 1,
                        "data": {
                            "id": 2,
                            "ufm_name": "Multi Face Detect",
                            "ufm_desc": "Multiple Face Detected",
                            "is_active": 1,
                            "accuracy": 1,
                            "escalation_count": 0,
                            "score_deducted": 0
                        }
                    },
                    "FNP": {
                        "value": 1,
                        "data": {
                            "id": 3,
                            "ufm_name": "Face Not Present",
                            "ufm_desc": "Face Not Present",
                            "is_active": 1,
                            "accuracy": 1,
                            "escalation_count": 0,
                            "score_deducted": 0
                        }
                    },
                    "PR": {
                        "value": 1,
                        "data": {
                            "id": 4,
                            "ufm_name": "Permission Revoked",
                            "ufm_desc": "Permission revoke",
                            "is_active": 1,
                            "accuracy": 1,
                            "escalation_count": 0,
                            "score_deducted": 0
                        }
                    },
                    "OD": {
                        "value": 1,
                        "data": {
                            "id": 5,
                            "ufm_name": "Object Detection",
                            "ufm_desc": "Object Detect",
                            "is_active": 1,
                            "accuracy": 1,
                            "escalation_count": 0,
                            "score_deducted": 0
                        }
                    },
                    "SFL": {
                        "value": 0,
                        "data": {
                            "id": 6,
                            "ufm_name": "Screen Focus Lost",
                            "ufm_desc": "Screen focus lost",
                            "is_active": 1,
                            "accuracy": 1,
                            "escalation_count": 0,
                            "score_deducted": 0
                        }
                    },
                    "VD": {
                        "value": 0,
                        "data": {
                            "id": 7,
                            "ufm_name": "Voice Detect",
                            "ufm_desc": "Voice Detection",
                            "is_active": 1,
                            "accuracy": 1,
                            "escalation_count": 0,
                            "score_deducted": 0
                        }
                    },
                    "VM": {
                        "value": 0,
                        "data": {
                            "id": 8,
                            "ufm_name": "Voice Muted",
                            "ufm_desc": "Voice Muted",
                            "is_active": 0,
                            "accuracy": 0,
                            "escalation_count": 0,
                            "score_deducted": 0
                        }
                    },
                    "LA": {
                        "value": 0,
                        "data": {
                            "id": 9,
                            "ufm_name": "Looking Away",
                            "ufm_desc": "Looking Away",
                            "is_active": 0,
                            "accuracy": 0,
                            "escalation_count": 0,
                            "score_deducted": 0
                        }
                    }
                }
            },
            "proctor_triggered_ufm": {
                "value": 0,
                "data": {
                    "max_score_deduction": {
                        "value": 10
                    }
                }
            },
            "penalty_enabled": {
                "value": 1,
                "data": {
                    "suspend": {
                        "value": 1,
                        "data": {
                            "suspend_cred_score": 30,
                            "suspend_time": 15
                        }
                    },
                    "terminate": {
                        "value": 40,
                        "data": {
                            "terminate_cred_score": 50
                        }
                    }
                }
            },
            "super_proctor_enabled": {
                "value": 0
            },
            "proctor_characteristic_enabled": {
                "value": 0
            }
        }
    }
};
    global.sessionResponse = mockSessionData; // Store the session response globally
    const mockLaguageData = JSON.parse(global.templateJson);
    const mockHtmlData = global.htmlTemplate;

    // call session initialize api
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true, // Simulate a successful HTTP status (2xx)
        json: () => Promise.resolve(mockSessionData), // Simulate the JSON response
      } as Response) // Type assertion to satisfy TypeScript
    );

    // download language json
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        // For JSON, provide the 'json' method
        json: () => Promise.resolve(mockLaguageData),
        // Important: Add a text() method if you want to avoid 'TypeError: response.text is not a function' if your code calls it unexpectedly.
        text: () => Promise.resolve(JSON.stringify(mockLaguageData)),
      } as Response)
    );

    // download page HTML template
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        // For HTML, provide the 'text' method
        text: () => Promise.resolve(mockHtmlData), // <--- Mocking .text()
        // Important: Add a json() method if you want to avoid 'TypeError: response.json is not a function' if your code calls it unexpectedly.
        json: () => Promise.resolve({}), // Return empty object for safety if json() is called
      } as Response)
    );

    const myTest  = {
            api_key: '9c78ec6b-1689-4f5a-8942-a4427393fb07',
            sdk_token: 'hcTzBfzzmBtCSK82Pob/hUpyUmpVQ21mSm04QzUwSkVmK2FnVElqbkpnM0NzUkYrTm9sRWRRR1dwMlRjU3ZHVkc5aGVpUno1RWU0NFJ2c1pQZ2RqbVNNTFNUNWhrRXVWNkFaMG1DNkhRcDBySmZ4RHdjQzhid1JQU3JXS2tlb0IxS0RiUUhRSlNPTzQxRit0',
            unique_user_id: "2578",
            user_name: 'AJAY',
            group_code: 'MORNING_2025',
            group_name: 'NEW_EXAM_LOREM',
            template_code: 'TEMP002',
            language: 'EN',
            registration_id_url:'',
            registration_photo_url:''
    }
    global.sessionToken = await ThinkProctor.init(myTest);
    
  // 4. Clear Mocks
  // Clear call history of the global mocks before each test
  global.mockFetch.mockClear();
  global.mockSdkCallback.mockClear();
  // If you also mock console methods, clear them here:
  // (jest.spyOn(console, 'log') as jest.Mock).mockClear(); etc.
  jest.clearAllTimers();

});

// Runs once after all tests in the entire test suite (or test environment)
afterAll(() => {
  // Restore real timers after all tests are done
  jest.useRealTimers();
  jest.clearAllMocks();
});

