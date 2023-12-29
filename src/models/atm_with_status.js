import "src/models/atm_status.js"
import "src/models/atm.js"
export interface AtmWithStatus{
  atm: Atm
  status: AtmStatus
}