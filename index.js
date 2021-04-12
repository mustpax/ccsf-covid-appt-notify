const { exec } = require("child_process");
const fetch = require("node-fetch");

function sanitize(msg) {
  return msg.replace(/[^\w \.]/g, "");
}

async function notify(msg) {
  return new Promise((resolve, reject) => {
    exec(
      `osascript -e 'display notification "${sanitize(msg)}"'`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(stdout, stderr);
      }
    );
  });
}

function get() {
  return fetch(
    "https://www.primarybio.com/test_groups/ccsf-public/appointment_slot_availabilities",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,tr;q=0.8",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua":
          '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrf-token":
          "qvJD2RglJ72KE0Mn2KaT2vr/mg9d5quNNLXTPY2LYISyRkGuTa0NaexZOJppCSFaoUZ25lg/+eocNlh8PHiUZg==",
        cookie:
          "__stripe_mid=f4b72385-ef34-4195-8779-9060292288a7345151; _ga=GA1.2.2038548380.1617819542; _gid=GA1.2.1911716520.1618202583; QueueITAccepted-SDFrts345E-V3_ccsfpublic=EventId%3Dccsfpublic%26QueueId%3Db3d71e83-209b-4631-9161-9f6b20ed56c8%26RedirectType%3Dsafetynet%26IssueTime%3D1618260782%26Hash%3D01db16eef91edade13f3034933017d82b55f4b0df2f49aa2d5c22de86b18c16b; _biostatus_session=WkUCrkSnooCUwBSxVsZGSH2EqfBRmZU5lxs6WMRZRDzgxgVlNVFsLoecd3pFMgYEHNH0DJVYCjBgCrtQvDpQYZD2mZsYPQ%2B2lLbG6WxwQ8BZ%2FspiNsRcqixL5or8MrEVYdSXsWluyVuzC90UQOOwxsK0%2BNmNLJI3s8Q7w1LtEZGChb6wsh6ZDCoYkQH7ssk4uN0sTZ4dPEI3xRxz6QmIDRnSCWRINcjgCzSWhkSY%2BbhfpzIStiEtGDMMVrYMiPACuB%2FNXyxxPzcupKqOKF2POgaBVLEdGdWyLZFxvGsyFFZem7Z2svM6nF%2FY4L7ykwo%2BUdFSAkO1lLOD6g%3D%3D--Wf%2FAM2QdGdbJKkrx--gEUx4%2BzVvUPGI%2FBha0jJzw%3D%3D",
      },
      referrer: "https://www.primarybio.com/r/ccsf-public",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: "{}",
      method: "POST",
      mode: "cors",
    }
  ).then((resp) => resp.json());
}

async function main() {
  let data = await get();
  let slots = data.appointment_slot_groups;
  console.log(slots.filter((slot) => slot.appointment_slots.length === 0));
}

main().catch(console.error);
