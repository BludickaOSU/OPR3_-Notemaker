package cz.osu.cerveny.be_opr3.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class ServiceAspect {
    public static final Logger LOGGER = LoggerFactory.getLogger(ServiceAspect.class);

    @Pointcut("execution(* cz.osu.cerveny.be_opr3.service..*(..))")
    public void appServiceMethods(){}

    @Before("appServiceMethods()")
    public void logBefore(JoinPoint joinPoint) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        String methodArgs = Arrays.toString(joinPoint.getArgs());
        LOGGER.info("AOP:: {}.{}() invoked with arguments: {}", className, methodName, methodArgs);
    }

    // Advice that runs after a method returns successfully
    @AfterReturning(pointcut = "appServiceMethods()", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {

        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        String methodArgs = Arrays.toString(joinPoint.getArgs());
        LOGGER.info("AOP:: {}.{}() completed with arguments: {} and result: {}", className, methodName, methodArgs, result);
    }

    @AfterThrowing(pointcut = "appServiceMethods()", throwing = "exception")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable exception) {

        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        String methodArgs = Arrays.toString(joinPoint.getArgs());
        LOGGER.error("AOP-C:: {}.{}() failed with arguments: {}", className, methodName, methodArgs, exception);
    }
}
