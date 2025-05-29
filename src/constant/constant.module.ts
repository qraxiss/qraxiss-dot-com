import { Global, Module } from '@nestjs/common';
import { ConstantService } from './constant.service';

@Module({
    providers: [ConstantService],
    exports: [ConstantService],
})
@Global()
export class ConstantModule {}
