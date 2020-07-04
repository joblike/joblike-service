import { Injectable, LoggerService, Optional, LogLevel } from '@nestjs/common';
import * as clc from 'cli-color';
import * as moment from 'moment';

declare const process: any;
const yellow = clc.xterm(3);

/*
    Copied from https://github.com/nestjs/nest/blob/master/packages/common/services/logger.service.ts
    The only change is isObject method whic is not imported from
    And the change of the prefix Nest => JobLike
    And used moment to print better time format with millis
*/
export class AppLogger implements LoggerService {

    private static logLevels: LogLevel[] = [
        'log',
        'error',
        'warn',
        'debug',
        'verbose',
      ];
      private static lastTimestamp?: number;
      private static instance?: typeof AppLogger | LoggerService = AppLogger;
    

    constructor(
        @Optional() protected context?: string,
        @Optional() private readonly isTimestampEnabled = false,
      ) {}
    
      error(message: any, trace = '', context?: string) {
        const instance = this.getInstance();
        if (!this.isLogLevelEnabled('error')) {
          return;
        }
        instance &&
          instance.error.call(instance, message, trace, context || this.context);
      }
    
      log(message: any, context?: string) {
        this.callFunction('log', message, context);
      }
    
      warn(message: any, context?: string) {
        this.callFunction('warn', message, context);
      }
    
      debug(message: any, context?: string) {
        this.callFunction('debug', message, context);
      }
    
      verbose(message: any, context?: string) {
        this.callFunction('verbose', message, context);
      }
    
      setContext(context: string) {
        this.context = context;
      }
    
      static overrideLogger(logger: LoggerService | LogLevel[] | boolean) {
        if (Array.isArray(logger)) {
          this.logLevels = logger;
          return;
        }
        this.instance = this.isObject(logger) ? (logger as LoggerService) : undefined;
      }
    
      static log(message: any, context = '', isTimeDiffEnabled = true) {
        this.printMessage(message, clc.green, context, isTimeDiffEnabled);
      }
    
      static error(
        message: any,
        trace = '',
        context = '',
        isTimeDiffEnabled = true,
      ) {
        this.printMessage(message, clc.red, context, isTimeDiffEnabled);
        this.printStackTrace(trace);
      }
    
      static warn(message: any, context = '', isTimeDiffEnabled = true) {
        this.printMessage(message, clc.yellow, context, isTimeDiffEnabled);
      }
    
      static debug(message: any, context = '', isTimeDiffEnabled = true) {
        this.printMessage(message, clc.magentaBright, context, isTimeDiffEnabled);
      }
    
      static verbose(message: any, context = '', isTimeDiffEnabled = true) {
        this.printMessage(message, clc.cyanBright, context, isTimeDiffEnabled);
      }
    
      private callFunction(
        name: 'log' | 'warn' | 'debug' | 'verbose',
        message: any,
        context?: string,
      ) {
        if (!this.isLogLevelEnabled(name)) {
          return;
        }
        const instance = this.getInstance();
        const func = instance && (instance as typeof AppLogger)[name];
        func &&
          func.call(
            instance,
            message,
            context || this.context,
            this.isTimestampEnabled,
          );
      }
    
      private getInstance(): typeof AppLogger | LoggerService {
        const { instance } = AppLogger;
        return instance === this ? AppLogger : instance;
      }
    
      private isLogLevelEnabled(level: LogLevel): boolean {
        return AppLogger.logLevels.includes(level);
      }
    

      
      private static printMessage(
        message: any,
        color: (message: string) => string,
        context = '',
        isTimeDiffEnabled?: boolean,
      ) {

        const output = this.isObject(message)
          ? `${color('Object:')}\n${JSON.stringify(message, null, 2)}\n`
          : color(message);
          
        const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    
        const pidMessage = color(`[JobLike] [pid: ${process.pid}] - `);
        const contextMessage = context ? yellow(`[${context}] `) : '';
        const timestampDiff = this.updateAndGetTimestampDiff(isTimeDiffEnabled);
            
        process.stdout.write(
          `${pidMessage}${timestamp} - ${contextMessage}${output}${timestampDiff}\n`,
        );
      }
    
      private static updateAndGetTimestampDiff(
        isTimeDiffEnabled?: boolean,
      ): string {
        const includeTimestamp = AppLogger.lastTimestamp && isTimeDiffEnabled;
        const result = includeTimestamp
          ? yellow(` +${Date.now() - AppLogger.lastTimestamp}ms`)
          : '';
          AppLogger.lastTimestamp = Date.now();
        return result;
      }
    
      private static printStackTrace(trace: string) {
        if (!trace) {
          return;
        }
        process.stdout.write(`${trace}\n`);
      }

      private static isObject = (fn: any): fn is object =>
        fn !== 'undefined' && fn !== null && typeof fn === 'object';

}
