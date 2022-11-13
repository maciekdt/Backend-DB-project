import { appContainer } from '../dependency/Container'
import { TYPES } from '../dependency/types'
import { System } from '../system/System'
import { DataBaseBuilder } from './DataBaseBuilder'

const builder = appContainer.get<DataBaseBuilder>(TYPES.DataBaseBuilder)
appContainer.get<System>(TYPES.System).init().then( 
    () => { builder.build() }
)