import { DataBaseService } from '../../database/DataBaseService'
import { appContainer } from '../dependency/Container'
import { TYPES } from '../dependency/types'
import { SystemConfigProvider } from '../system/SystemConfigProvider'
import { DataBaseBuilder } from './DataBaseBuilder'

const builder = appContainer.get<DataBaseBuilder>(TYPES.DataBaseBuilder)
appContainer.get<SystemConfigProvider>(TYPES.SystemConfigProvider).init()
    .then(function(_){
        appContainer.get<DataBaseService>(TYPES.DataBaseService).connect()
    }).then(function(_){builder.build()})